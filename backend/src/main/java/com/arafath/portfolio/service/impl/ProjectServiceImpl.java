package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.ProjectRequest;
import com.arafath.portfolio.dto.response.ProjectResponse;
import com.arafath.portfolio.entity.Project;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.ProjectMapper;
import com.arafath.portfolio.repository.ProjectRepository;
import com.arafath.portfolio.service.interfaces.ProjectService;
import com.arafath.portfolio.storage.dto.StorageResult;
import com.arafath.portfolio.storage.enums.FileCategory;
import com.arafath.portfolio.storage.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final FileStorageService fileStorageService;

    @Override
    public ProjectResponse create(ProjectRequest request) {

        log.info("Creating project with slug: {}", request.getSlug());

        if (projectRepository.existsBySlug(request.getSlug())) {
            log.warn("Duplicate project slug detected: {}", request.getSlug());
            throw new DuplicateResourceException("Project", "slug", request.getSlug());
        }

        Project project = projectMapper.toEntity(request);
        project = projectRepository.save(project);

        log.info("Project created successfully with ID: {}", project.getId());

        return mapToResponse(project);
    }

    @Override
    public ProjectResponse update(Long id, ProjectRequest request) {

        log.info("Updating project with ID: {}", id);

        Project project = findProjectById(id);

        if (projectRepository.findBySlug(request.getSlug())
                .filter(existingProject -> !existingProject.getId().equals(id))
                .isPresent()) {
            log.warn("Duplicate project slug detected: {}", request.getSlug());
            throw new DuplicateResourceException("Project", "slug", request.getSlug());
        }

        projectMapper.updateEntityFromRequest(request, project);
        project = projectRepository.save(project);

        log.info("Project updated successfully with ID: {}", id);

        return mapToResponse(project);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse getById(Long id) {

        log.info("Fetching project with ID: {}", id);

        Project project = findProjectById(id);

        log.info("Project retrieved successfully with ID: {}", id);

        return mapToResponse(project);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getAll() {

        log.info("Fetching all projects.");

        List<Project> projects = projectRepository.findAll(Sort.by(Sort.Direction.ASC, "displayOrder", "id"));

        log.info("Retrieved {} project(s) successfully.", projects.size());

        return projects.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProjectResponse> getPage(Pageable pageable) {

        log.info(
                "Fetching project page. page={}, size={}, sort={}",
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pageable.getSort()
        );

        return PageResponse.from(
                projectRepository.findAll(pageable)
                        .map(this::mapToResponse)
        );
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting project with ID: {}", id);

        Project project = findProjectById(id);

        // Collect all physical file paths to clean up after commit
        List<String> pathsToDelete = new ArrayList<>();

        if (StringUtils.hasText(project.getThumbnailUrl())) {
            pathsToDelete.add(project.getThumbnailUrl());
        }

        project.getImages().stream()
                .map(com.arafath.portfolio.entity.ProjectImage::getImageUrl)
                .filter(StringUtils::hasText)
                .forEach(pathsToDelete::add);

        projectRepository.delete(project);

        if (!pathsToDelete.isEmpty()) {
            if (TransactionSynchronizationManager.isSynchronizationActive()) {
                TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        for (String path : pathsToDelete) {
                            try {
                                fileStorageService.delete(path);
                                log.info("Cleaned up physical project file '{}' post-commit", path);
                            } catch (Exception ex) {
                                log.error("Failed to clean up physical project file '{}' post-commit", path, ex);
                            }
                        }
                    }
                });
            } else {
                for (String path : pathsToDelete) {
                    fileStorageService.delete(path);
                }
            }
        }

        log.info("Project deleted successfully with ID: {}", id);
    }

    @Override
    public ProjectResponse uploadProjectThumbnail(Long id, MultipartFile file) {

        log.info("Uploading thumbnail for project ID: {}", id);

        Project project = findProjectById(id);

        StorageResult storageResult = fileStorageService.replace(project.getThumbnailUrl(), file, FileCategory.PROJECT);

        project.setThumbnailUrl(storageResult.getRelativePath());
        project = projectRepository.save(project);

        log.info("Project thumbnail updated successfully for ID: {}", id);

        return mapToResponse(project);
    }

    // ==========================================
    // Private helpers
    // ==========================================

    /**
     * Maps a Project entity to a ProjectResponse, resolving the thumbnailUrl
     * to a full URL when the field is non-empty — following the same pattern
     * as CertificationServiceImpl.mapToResponse.
     */
    private ProjectResponse mapToResponse(Project project) {
        ProjectResponse response = projectMapper.toResponse(project);
        if (response != null && StringUtils.hasText(project.getThumbnailUrl())) {
            response.setThumbnailUrl(fileStorageService.generateUrl(project.getThumbnailUrl()));
        }
        return response;
    }

    private Project findProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Project not found with ID: {}", id);
                    return new ResourceNotFoundException("Project", "id", id);
                });
    }
}
