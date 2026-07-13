package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.CertificationRequest;
import com.arafath.portfolio.dto.response.CertificationResponse;
import com.arafath.portfolio.entity.Certification;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.CertificationMapper;
import com.arafath.portfolio.repository.CertificationRepository;
import com.arafath.portfolio.service.interfaces.CertificationService;
import com.arafath.portfolio.storage.dto.FileUploadResponse;
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

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService {

    private final CertificationRepository certificationRepository;
    private final CertificationMapper certificationMapper;
    private final FileStorageService fileStorageService;

    @Override
    public CertificationResponse create(CertificationRequest request) {

        log.info("Creating certification with title: {}", request.getTitle());

        if (StringUtils.hasText(request.getCredentialId())
                && certificationRepository.existsByCredentialId(request.getCredentialId())) {
            log.warn("Duplicate credential ID detected: {}", request.getCredentialId());
            throw new DuplicateResourceException("Certification", "credentialId", request.getCredentialId());
        }

        Certification certification = certificationMapper.toEntity(request);
        certification = certificationRepository.save(certification);

        log.info("Certification created successfully with ID: {}", certification.getId());

        return mapToResponse(certification);
    }

    @Override
    public CertificationResponse update(Long id, CertificationRequest request) {

        log.info("Updating certification with ID: {}", id);

        Certification certification = findCertificationById(id);

        if (StringUtils.hasText(request.getCredentialId())
                && certificationRepository.findByCredentialId(request.getCredentialId())
                .filter(existingCertification -> !existingCertification.getId().equals(id))
                .isPresent()) {
            log.warn("Duplicate credential ID detected: {}", request.getCredentialId());
            throw new DuplicateResourceException("Certification", "credentialId", request.getCredentialId());
        }

        certificationMapper.updateEntityFromRequest(request, certification);
        certification = certificationRepository.save(certification);

        log.info("Certification updated successfully with ID: {}", certification.getId());

        return mapToResponse(certification);
    }

    @Override
    @Transactional(readOnly = true)
    public CertificationResponse getById(Long id) {

        log.info("Fetching certification with ID: {}", id);

        Certification certification = findCertificationById(id);

        log.info("Certification retrieved successfully with ID: {}", id);

        return mapToResponse(certification);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CertificationResponse> getAll() {

        log.info("Fetching all certifications.");

        List<Certification> certifications = certificationRepository.findAll(
                Sort.by(Sort.Direction.ASC, "displayOrder", "id")
        );

        log.info("Retrieved {} certification(s) successfully.", certifications.size());

        return certifications.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<CertificationResponse> getPage(Pageable pageable) {

        log.info(
                "Fetching certification page. page={}, size={}, sort={}",
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pageable.getSort()
        );

        return PageResponse.from(
                certificationRepository.findAll(pageable)
                        .map(this::mapToResponse)
        );
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting certification with ID: {}", id);

        Certification certification = findCertificationById(id);
        String relativePath = certification.getImageUrl();

        certificationRepository.delete(certification);

        if (StringUtils.hasText(relativePath)) {
            if (TransactionSynchronizationManager.isSynchronizationActive()) {
                TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        try {
                            fileStorageService.delete(relativePath);
                            log.info("Physical certificate image file '{}' deleted post-commit", relativePath);
                        } catch (Exception ex) {
                            log.error("Failed to delete physical certificate image file '{}' post-commit", relativePath, ex);
                        }
                    }
                });
            } else {
                fileStorageService.delete(relativePath);
            }
        }

        log.info("Certification deleted successfully with ID: {}", id);
    }

    @Override
    public FileUploadResponse uploadCertificateImage(Long id, MultipartFile file) {
        log.info("Uploading certificate image for certification ID: {}", id);
        Certification certification = findCertificationById(id);

        StorageResult storageResult = fileStorageService.replace(certification.getImageUrl(), file, FileCategory.CERTIFICATE);

        certification.setImageUrl(storageResult.getRelativePath());
        certification = certificationRepository.save(certification);
        log.info("Certificate image database record updated successfully for ID: {}", certification.getId());

        return FileUploadResponse.builder()
                .filename(storageResult.getFilename())
                .originalFilename(storageResult.getOriginalFilename())
                .contentType(storageResult.getContentType())
                .size(storageResult.getSize())
                .url(storageResult.getUrl())
                .uploadedAt(LocalDateTime.now())
                .build();
    }

    private CertificationResponse mapToResponse(Certification certification) {
        CertificationResponse response = certificationMapper.toResponse(certification);
        if (response != null && StringUtils.hasText(certification.getImageUrl())) {
            response.setImageUrl(fileStorageService.generateUrl(certification.getImageUrl()));
        }
        return response;
    }

    private Certification findCertificationById(Long id) {
        return certificationRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Certification not found with ID: {}", id);
                    return new ResourceNotFoundException("Certification", "id", id);
                });
    }
}
