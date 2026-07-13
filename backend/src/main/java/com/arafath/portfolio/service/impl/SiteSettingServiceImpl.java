package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.SiteSettingRequest;
import com.arafath.portfolio.dto.response.SiteSettingResponse;
import com.arafath.portfolio.entity.SiteSetting;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.SiteSettingMapper;
import com.arafath.portfolio.repository.SiteSettingRepository;
import com.arafath.portfolio.service.interfaces.SiteSettingService;
import com.arafath.portfolio.storage.dto.FileUploadResponse;
import com.arafath.portfolio.storage.dto.StorageResult;
import com.arafath.portfolio.storage.enums.FileCategory;
import com.arafath.portfolio.storage.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SiteSettingServiceImpl implements SiteSettingService {

    private final SiteSettingRepository siteSettingRepository;
    private final SiteSettingMapper siteSettingMapper;
    private final FileStorageService fileStorageService;

    @Override
    public SiteSettingResponse create(SiteSettingRequest request) {

        log.info("Creating portfolio site settings for contact email: {}", request.getContactEmail());

        if (siteSettingRepository.count() > 0) {
            log.warn("Attempted to create a second SiteSetting record.");
            throw new DuplicateResourceException("Portfolio site settings already exist.");
        }

        SiteSetting siteSetting = siteSettingMapper.toEntity(request);
        siteSetting = siteSettingRepository.save(siteSetting);

        log.info("Site settings created successfully with ID: {}", siteSetting.getId());

        return mapToResponse(siteSetting);
    }

    @Override
    public SiteSettingResponse update(Long id, SiteSettingRequest request) {

        log.info("Updating site settings with ID: {}", id);

        SiteSetting siteSetting = findSiteSettingById(id);

        if (!siteSetting.getContactEmail().equalsIgnoreCase(request.getContactEmail())
                && siteSettingRepository.existsByContactEmail(request.getContactEmail())) {
            log.warn("Duplicate contact email detected: {}", request.getContactEmail());
            throw new DuplicateResourceException("SiteSetting", "contactEmail", request.getContactEmail());
        }

        siteSettingMapper.updateEntityFromRequest(request, siteSetting);
        siteSetting = siteSettingRepository.save(siteSetting);

        log.info("Site settings updated successfully with ID: {}", siteSetting.getId());

        return mapToResponse(siteSetting);
    }

    @Override
    @Transactional(readOnly = true)
    public SiteSettingResponse getById(Long id) {

        log.info("Fetching site settings with ID: {}", id);

        SiteSetting siteSetting = findSiteSettingById(id);

        log.info("Site settings retrieved successfully with ID: {}", id);

        return mapToResponse(siteSetting);
    }

    @Override
    @Transactional(readOnly = true)
    public SiteSettingResponse get() {

        log.info("Fetching portfolio site settings.");

        SiteSetting siteSetting = siteSettingRepository.findByActiveTrue()
                .orElseThrow(() -> {
                    log.warn("Portfolio site settings not found.");
                    return new ResourceNotFoundException("Portfolio site settings not found.");
                });

        log.info("Portfolio site settings retrieved successfully.");

        return mapToResponse(siteSetting);
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting site settings with ID: {}", id);

        SiteSetting siteSetting = findSiteSettingById(id);
        String logoPath = siteSetting.getLogoUrl();
        String faviconPath = siteSetting.getFaviconUrl();

        siteSettingRepository.delete(siteSetting);

        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    if (StringUtils.hasText(logoPath)) {
                        try {
                            fileStorageService.delete(logoPath);
                        } catch (Exception ex) {
                            log.error("Failed to delete physical logo file '{}'", logoPath, ex);
                        }
                    }
                    if (StringUtils.hasText(faviconPath)) {
                        try {
                            fileStorageService.delete(faviconPath);
                        } catch (Exception ex) {
                            log.error("Failed to delete physical favicon file '{}'", faviconPath, ex);
                        }
                    }
                }
            });
        } else {
            if (StringUtils.hasText(logoPath)) {
                fileStorageService.delete(logoPath);
            }
            if (StringUtils.hasText(faviconPath)) {
                fileStorageService.delete(faviconPath);
            }
        }

        log.info("Site settings deleted successfully with ID: {}", id);
    }

    @Override
    public FileUploadResponse uploadLogo(MultipartFile file) {
        log.info("Uploading site logo");
        SiteSetting siteSetting = siteSettingRepository.findByActiveTrue()
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio site settings not found."));

        StorageResult storageResult = fileStorageService.replace(siteSetting.getLogoUrl(), file, FileCategory.LOGO);

        siteSetting.setLogoUrl(storageResult.getRelativePath()); // Store relative path
        siteSetting = siteSettingRepository.save(siteSetting);
        log.info("Site logo updated successfully in database.");

        return FileUploadResponse.builder()
                .filename(storageResult.getFilename())
                .originalFilename(storageResult.getOriginalFilename())
                .contentType(storageResult.getContentType())
                .size(storageResult.getSize())
                .url(storageResult.getUrl())
                .uploadedAt(LocalDateTime.now())
                .build();
    }

    @Override
    public FileUploadResponse uploadFavicon(MultipartFile file) {
        log.info("Uploading site favicon");
        SiteSetting siteSetting = siteSettingRepository.findByActiveTrue()
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio site settings not found."));

        StorageResult storageResult = fileStorageService.replace(siteSetting.getFaviconUrl(), file, FileCategory.FAVICON);

        siteSetting.setFaviconUrl(storageResult.getRelativePath()); // Store relative path
        siteSetting = siteSettingRepository.save(siteSetting);
        log.info("Site favicon updated successfully in database.");

        return FileUploadResponse.builder()
                .filename(storageResult.getFilename())
                .originalFilename(storageResult.getOriginalFilename())
                .contentType(storageResult.getContentType())
                .size(storageResult.getSize())
                .url(storageResult.getUrl())
                .uploadedAt(LocalDateTime.now())
                .build();
    }

    private SiteSettingResponse mapToResponse(SiteSetting siteSetting) {
        SiteSettingResponse response = siteSettingMapper.toResponse(siteSetting);
        if (response != null) {
            if (StringUtils.hasText(siteSetting.getLogoUrl())) {
                response.setLogoUrl(fileStorageService.generateUrl(siteSetting.getLogoUrl()));
            }
            if (StringUtils.hasText(siteSetting.getFaviconUrl())) {
                response.setFaviconUrl(fileStorageService.generateUrl(siteSetting.getFaviconUrl()));
            }
        }
        return response;
    }

    private SiteSetting findSiteSettingById(Long id) {
        return siteSettingRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Site settings not found with ID: {}", id);
                    return new ResourceNotFoundException("SiteSetting", "id", id);
                });
    }

}
