package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.ProjectImageRequest;
import com.arafath.portfolio.dto.response.ProjectImageResponse;
import com.arafath.portfolio.dto.response.ProjectImageUploadResponse;
import com.arafath.portfolio.entity.Project;
import com.arafath.portfolio.entity.ProjectImage;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.ProjectImageMapper;
import com.arafath.portfolio.repository.ProjectImageRepository;
import com.arafath.portfolio.repository.ProjectRepository;
import com.arafath.portfolio.service.interfaces.ProjectImageService;
import com.arafath.portfolio.storage.dto.StorageResult;
import com.arafath.portfolio.storage.enums.FileCategory;
import com.arafath.portfolio.storage.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProjectImageServiceImpl implements ProjectImageService {

    private final ProjectImageRepository projectImageRepository;
    private final ProjectRepository projectRepository;
    private final ProjectImageMapper projectImageMapper;
    private final FileStorageService fileStorageService;

    @Override
    public ProjectImageResponse create(ProjectImageRequest request) {

        log.info("Creating project image for project ID: {}", request.getProjectId());

        Project project = findProjectById(request.getProjectId());

        ProjectImage projectImage = projectImageMapper.toEntity(request);
        projectImage.setProject(project);
        projectImage = projectImageRepository.save(projectImage);

        log.info("Project image created successfully with ID: {}", projectImage.getId());

        return mapToResponse(projectImage);
    }

    @Override
    public ProjectImageResponse update(Long id, ProjectImageRequest request) {

        log.info("Updating project image with ID: {}", id);

        ProjectImage projectImage = findProjectImageById(id);
        Project project = findProjectById(request.getProjectId());

        projectImageMapper.updateEntityFromRequest(request, projectImage);
        projectImage.setProject(project);
        projectImage = projectImageRepository.save(projectImage);

        log.info("Project image updated successfully with ID: {}", projectImage.getId());

        return mapToResponse(projectImage);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectImageResponse getById(Long id) {

        log.info("Fetching project image with ID: {}", id);

        ProjectImage projectImage = findProjectImageById(id);

        log.info("Project image retrieved successfully with ID: {}", id);

        return mapToResponse(projectImage);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectImageResponse> getAll() {

        log.info("Fetching all project images.");

        List<ProjectImage> projectImages = projectImageRepository.findAll(
                Sort.by(Sort.Direction.ASC, "displayOrder", "id")
        );

        log.info("Retrieved {} project image(s) successfully.", projectImages.size());

        return projectImages.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectImageResponse> getByProjectId(Long projectId) {

        log.info("Fetching images for project ID: {}", projectId);

        findProjectById(projectId);

        List<ProjectImage> projectImages = projectImageRepository.findByProjectIdOrderByDisplayOrderAscIdAsc(projectId);

        log.info("Retrieved {} project image(s) for project ID: {}", projectImages.size(), projectId);

        return projectImages.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting project image with ID: {}", id);

        ProjectImage projectImage = findProjectImageById(id);
        String relativePath = projectImage.getImageUrl();

        projectImageRepository.delete(projectImage);

        if (StringUtils.hasText(relativePath)) {
            if (TransactionSynchronizationManager.isSynchronizationActive()) {
                TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        try {
                            fileStorageService.delete(relativePath);
                            log.info("Physical project image file '{}' deleted post-commit", relativePath);
                        } catch (Exception ex) {
                            log.error("Failed to delete physical project image file '{}' post-commit", relativePath, ex);
                        }
                    }
                });
            } else {
                fileStorageService.delete(relativePath);
            }
        }

        log.info("Project image deleted successfully with ID: {}", id);
    }

    @Override
    public ProjectImageUploadResponse uploadProjectImage(Long projectId, MultipartFile file, String caption, Integer displayOrder) {
        log.info("Uploading project image for project ID: {}", projectId);
        Project project = findProjectById(projectId);

        StorageResult storageResult = fileStorageService.store(file, FileCategory.PROJECT);

        ProjectImage projectImage = new ProjectImage();
        projectImage.setProject(project);
        projectImage.setImageUrl(storageResult.getRelativePath());
        projectImage.setCaption(caption);
        projectImage.setDisplayOrder(displayOrder != null ? displayOrder : 0);
        projectImage.setActive(true);

        projectImage = projectImageRepository.save(projectImage);
        log.info("Project image database record created successfully with ID: {}", projectImage.getId());

        String publicUrl = fileStorageService.generateUrl(projectImage.getImageUrl());

        return ProjectImageUploadResponse.builder()
                .id(projectImage.getId())
                .imageUrl(publicUrl)
                .caption(projectImage.getCaption())
                .displayOrder(projectImage.getDisplayOrder())
                .active(projectImage.getActive())
                .projectId(project.getId())
                .projectTitle(project.getTitle())
                .filename(storageResult.getFilename())
                .originalFilename(storageResult.getOriginalFilename())
                .contentType(storageResult.getContentType())
                .size(storageResult.getSize())
                .url(publicUrl)
                .uploadedAt(LocalDateTime.now())
                .build();
    }

    private ProjectImageResponse mapToResponse(ProjectImage projectImage) {
        ProjectImageResponse response = projectImageMapper.toResponse(projectImage);
        if (response != null && StringUtils.hasText(projectImage.getImageUrl())) {
            response.setImageUrl(fileStorageService.generateUrl(projectImage.getImageUrl()));
        }
        return response;
    }

    private ProjectImage findProjectImageById(Long id) {
        return projectImageRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Project image not found with ID: {}", id);
                    return new ResourceNotFoundException("ProjectImage", "id", id);
                });
    }

    private Project findProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Project not found with ID: {}", id);
                    return new ResourceNotFoundException("Project", "id", id);
                });
    }
}
