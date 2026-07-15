package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.AboutRequest;
import com.arafath.portfolio.dto.response.AboutResponse;
import com.arafath.portfolio.entity.About;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.AboutMapper;
import com.arafath.portfolio.repository.AboutRepository;
import com.arafath.portfolio.service.interfaces.AboutService;
import com.arafath.portfolio.storage.dto.FileUploadResponse;
import com.arafath.portfolio.storage.dto.StorageResult;
import com.arafath.portfolio.storage.enums.FileCategory;
import com.arafath.portfolio.storage.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AboutServiceImpl implements AboutService {

    private final AboutRepository aboutRepository;
    private final AboutMapper aboutMapper;
    private final FileStorageService fileStorageService;

    @Override
    public AboutResponse create(AboutRequest request) {

        log.info("Creating About information for email: {}", request.getEmail());

        if (aboutRepository.existsBy()) {

            log.warn("Attempted to create a second About record.");

            throw new DuplicateResourceException(
                    "Portfolio About information already exists."
            );
        }

        if (aboutRepository.existsByEmail(request.getEmail())) {

            log.warn("Duplicate email detected: {}", request.getEmail());

            throw new DuplicateResourceException(
                    "About",
                    "email",
                    request.getEmail()
            );
        }

        About about = aboutMapper.toEntity(request);

        about = aboutRepository.save(about);

        log.info("About information created successfully with ID: {}", about.getId());

        return mapToResponse(about);
    }


    @Override
    public AboutResponse update(Long id, AboutRequest request) {

        log.info("Updating About information with ID: {}", id);

        About about = aboutRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("About information not found with ID: {}", id);
                    return new ResourceNotFoundException(
                            "About",
                            "id",
                            id
                    );
                });

        if (aboutRepository.existsByEmailAndIdNot(request.getEmail(), id)) {

            log.warn("Duplicate email detected: {}", request.getEmail());

            throw new DuplicateResourceException(
                    "About",
                    "email",
                    request.getEmail()
            );
        }

        aboutMapper.updateEntityFromRequest(request, about);

        about = aboutRepository.save(about);

        log.info("About information updated successfully with ID: {}", id);

        return mapToResponse(about);
    }


    @Override
    @Transactional(readOnly = true)
    public AboutResponse getById(Long id) {

        log.info("Fetching About information with ID: {}", id);

        About about = aboutRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("About information not found with ID: {}", id);
                    return new ResourceNotFoundException(
                            "About",
                            "id",
                            id
                    );
                });

        log.info("About information retrieved successfully with ID: {}", id);

        return mapToResponse(about);
    }


    @Override
    @Transactional(readOnly = true)
    public AboutResponse get() {

        log.info("Fetching portfolio About information.");

        About about = aboutRepository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> {
                    log.warn("Portfolio About information not found.");
                    return new ResourceNotFoundException(
                            "Portfolio About information not found."
                    );
                });

        log.info("Portfolio About information retrieved successfully.");

        return mapToResponse(about);
    }


    @Override
    public void delete(Long id) {

        log.info("Deleting About information with ID: {}", id);

        About about = aboutRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("About information not found with ID: {}", id);
                    return new ResourceNotFoundException(
                            "About",
                            "id",
                            id
                    );
                });

        aboutRepository.delete(about);

        log.info("About information deleted successfully with ID: {}", id);
    }

    @Override
    public FileUploadResponse uploadProfileImage(Long id, MultipartFile file) {
        log.info("Uploading profile image for About ID: {}", id);

        About about = aboutRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("About information not found with ID: {}", id);
                    return new ResourceNotFoundException("About", "id", id);
                });

        // Replace existing image (or store new if none) under the ABOUT category folder
        StorageResult storageResult = fileStorageService.replace(
                about.getProfileImage(), file, FileCategory.ABOUT
        );

        about.setProfileImage(storageResult.getRelativePath());
        aboutRepository.save(about);

        log.info("Profile image updated successfully for About ID: {}", id);

        return FileUploadResponse.builder()
                .filename(storageResult.getFilename())
                .originalFilename(storageResult.getOriginalFilename())
                .contentType(storageResult.getContentType())
                .size(storageResult.getSize())
                .url(storageResult.getUrl())
                .uploadedAt(LocalDateTime.now())
                .build();
    }

    /**
     * Maps About entity to response DTO, resolving media paths to public /media/ URLs.
     */
    private AboutResponse mapToResponse(About about) {
        AboutResponse response = aboutMapper.toResponse(about);
        if (response != null) {
            if (StringUtils.hasText(about.getProfileImage())) {
                response.setProfileImage(fileStorageService.generateUrl(about.getProfileImage()));
            }
            if (StringUtils.hasText(about.getCoverImage())) {
                response.setCoverImage(fileStorageService.generateUrl(about.getCoverImage()));
            }
        }
        return response;
    }
}
