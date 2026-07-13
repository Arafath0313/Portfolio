package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.PassionRequest;
import com.arafath.portfolio.dto.response.PassionResponse;
import com.arafath.portfolio.entity.Passion;
import com.arafath.portfolio.entity.enums.ContentPlatform;
import com.arafath.portfolio.entity.enums.PassionCategory;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.PassionMapper;
import com.arafath.portfolio.repository.PassionRepository;
import com.arafath.portfolio.service.interfaces.PassionService;
import com.arafath.portfolio.storage.dto.FileUploadResponse;
import com.arafath.portfolio.storage.dto.StorageResult;
import com.arafath.portfolio.storage.enums.FileCategory;
import com.arafath.portfolio.storage.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public class PassionServiceImpl implements PassionService {

    private final PassionRepository passionRepository;
    private final PassionMapper passionMapper;
    private final FileStorageService fileStorageService;

    @Override
    public PassionResponse create(PassionRequest request) {
        log.info("Creating passion with title: {}", request.getTitle());

        Passion passion = passionMapper.toEntity(request);
        passion = passionRepository.save(passion);

        log.info("Passion created successfully with ID: {}", passion.getId());
        return mapToResponse(passion);
    }

    @Override
    public PassionResponse update(Long id, PassionRequest request) {
        log.info("Updating passion with ID: {}", id);

        Passion passion = findPassionById(id);
        passionMapper.updateEntityFromRequest(request, passion);
        
        passion = passionRepository.save(passion);
        log.info("Passion updated successfully with ID: {}", passion.getId());

        return mapToResponse(passion);
    }

    @Override
    @Transactional(readOnly = true)
    public PassionResponse getById(Long id) {
        log.info("Fetching passion with ID: {}", id);
        Passion passion = findPassionById(id);
        return mapToResponse(passion);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PassionResponse> getAll() {
        log.info("Fetching all passions.");
        List<Passion> passions = passionRepository.findAll(
                Sort.by(Sort.Order.asc("displayOrder"), Sort.Order.desc("id"))
        );
        return passions.stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<PassionResponse> getPage(Pageable pageable) {
        log.info("Fetching passion page. page={}, size={}", pageable.getPageNumber(), pageable.getPageSize());
        return PageResponse.from(passionRepository.findAll(pageable).map(this::mapToResponse));
    }
    
    @Override
    @Transactional(readOnly = true)
    public PageResponse<PassionResponse> getFilteredPage(
            PassionCategory category,
            ContentPlatform platform,
            Boolean featured,
            Boolean active,
            String search,
            Pageable pageable) {
        
        log.info("Fetching filtered passion page.");
        // If we really wanted to filter by all these at once, we'd use Specifications. 
        // For now, based on the previous repository setup, we fallback to specific repository methods 
        // depending on what's provided, or just fetch all if it gets too complex and needs Specification.
        // Let's do a simple fallback sequence, prioritizing category, then platform.
        // A better approach is using Spring Data JPA Specifications, but without adding new classes, 
        // let's use the basic repository methods.
        
        Page<Passion> result;
        if (StringUtils.hasText(search)) {
            result = passionRepository.findByTitleContainingIgnoreCase(search, pageable);
        } else if (category != null && Boolean.TRUE.equals(active)) {
            result = passionRepository.findByCategoryAndActiveTrue(category, pageable);
        } else if (category != null) {
            result = passionRepository.findByCategory(category, pageable);
        } else if (platform != null) {
            result = passionRepository.findByContentPlatform(platform, pageable);
        } else if (Boolean.TRUE.equals(featured) && Boolean.TRUE.equals(active)) {
            result = passionRepository.findByFeaturedTrueAndActiveTrue(pageable);
        } else if (Boolean.TRUE.equals(active)) {
            result = passionRepository.findByActiveTrue(pageable);
        } else {
            result = passionRepository.findAll(pageable);
        }

        return PageResponse.from(result.map(this::mapToResponse));
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting passion with ID: {}", id);

        Passion passion = findPassionById(id);
        String relativePath = passion.getThumbnail();

        passionRepository.delete(passion);

        if (StringUtils.hasText(relativePath)) {
            if (TransactionSynchronizationManager.isSynchronizationActive()) {
                TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        try {
                            fileStorageService.delete(relativePath);
                            log.info("Physical passion thumbnail file '{}' deleted post-commit", relativePath);
                        } catch (Exception ex) {
                            log.error("Failed to delete physical passion thumbnail file '{}' post-commit", relativePath, ex);
                        }
                    }
                });
            } else {
                fileStorageService.delete(relativePath);
            }
        }

        log.info("Passion deleted successfully with ID: {}", id);
    }

    @Override
    public FileUploadResponse uploadThumbnail(Long id, MultipartFile file) {
        log.info("Uploading passion thumbnail image for passion ID: {}", id);
        Passion passion = findPassionById(id);

        StorageResult storageResult = fileStorageService.replace(passion.getThumbnail(), file, FileCategory.PASSION);

        passion.setThumbnail(storageResult.getRelativePath());
        passion = passionRepository.save(passion);
        log.info("Passion thumbnail image database record updated successfully for ID: {}", passion.getId());

        return FileUploadResponse.builder()
                .filename(storageResult.getFilename())
                .originalFilename(storageResult.getOriginalFilename())
                .contentType(storageResult.getContentType())
                .size(storageResult.getSize())
                .url(storageResult.getUrl())
                .uploadedAt(LocalDateTime.now())
                .build();
    }

    private PassionResponse mapToResponse(Passion passion) {
        PassionResponse response = passionMapper.toResponse(passion);
        if (response != null && StringUtils.hasText(passion.getThumbnail())) {
            response.setThumbnail(fileStorageService.generateUrl(passion.getThumbnail()));
        }
        return response;
    }

    private Passion findPassionById(Long id) {
        return passionRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Passion not found with ID: {}", id);
                    return new ResourceNotFoundException("Passion", "id", id);
                });
    }
}
