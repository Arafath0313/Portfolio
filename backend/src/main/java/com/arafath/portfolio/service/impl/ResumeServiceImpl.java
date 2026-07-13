package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.ResumeRequest;
import com.arafath.portfolio.dto.response.ResumeResponse;
import com.arafath.portfolio.entity.About;
import com.arafath.portfolio.entity.Resume;
import com.arafath.portfolio.enums.FileType;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.ResumeMapper;
import com.arafath.portfolio.repository.AboutRepository;
import com.arafath.portfolio.repository.ResumeRepository;
import com.arafath.portfolio.service.interfaces.ResumeService;
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
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final AboutRepository aboutRepository;
    private final ResumeMapper resumeMapper;
    private final FileStorageService fileStorageService;

    @Override
    public ResumeResponse create(ResumeRequest request) {

        log.info("Creating portfolio resume for About ID: {}", request.getAboutId());

        if (resumeRepository.count() > 0) {
            log.warn("Attempted to create a second resume record.");
            throw new DuplicateResourceException("Portfolio resume already exists.");
        }

        if (StringUtils.hasText(request.getVersion())
                && resumeRepository.existsByVersion(request.getVersion())) {
            log.warn("Duplicate resume version detected: {}", request.getVersion());
            throw new DuplicateResourceException("Resume", "version", request.getVersion());
        }

        About about = findAboutById(request.getAboutId());

        Resume resume = resumeMapper.toEntity(request);
        resume.setAbout(about);
        resume = resumeRepository.save(resume);

        log.info("Resume created successfully with ID: {}", resume.getId());

        return mapToResponse(resume);
    }

    @Override
    public ResumeResponse update(Long id, ResumeRequest request) {

        log.info("Updating resume with ID: {}", id);

        Resume resume = findResumeById(id);

        if (StringUtils.hasText(request.getVersion())
                && resumeRepository.findByVersion(request.getVersion())
                .filter(existingResume -> !existingResume.getId().equals(id))
                .isPresent()) {
            log.warn("Duplicate resume version detected: {}", request.getVersion());
            throw new DuplicateResourceException("Resume", "version", request.getVersion());
        }

        About about = findAboutById(request.getAboutId());

        if (!resume.getAbout().getId().equals(about.getId())
                && resumeRepository.existsByAbout(about)) {
            log.warn("Duplicate About reference detected for resume with About ID: {}", request.getAboutId());
            throw new DuplicateResourceException("Resume", "aboutId", request.getAboutId());
        }

        resumeMapper.updateEntityFromRequest(request, resume);
        resume.setAbout(about);
        resume = resumeRepository.save(resume);

        log.info("Resume updated successfully with ID: {}", resume.getId());

        return mapToResponse(resume);
    }

    @Override
    @Transactional(readOnly = true)
    public ResumeResponse getById(Long id) {

        log.info("Fetching resume with ID: {}", id);

        Resume resume = findResumeById(id);

        log.info("Resume retrieved successfully with ID: {}", id);

        return mapToResponse(resume);
    }

    @Override
    @Transactional(readOnly = true)
    public ResumeResponse get() {

        log.info("Fetching portfolio resume.");

        Resume resume = resumeRepository.findByActiveTrue()
                .orElseThrow(() -> {
                    log.warn("Portfolio resume not found.");
                    return new ResourceNotFoundException("Portfolio resume not found.");
                });

        log.info("Portfolio resume retrieved successfully.");

        return mapToResponse(resume);
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting resume with ID: {}", id);

        Resume resume = findResumeById(id);
        String relativePath = resume.getFileUrl();

        resumeRepository.delete(resume);

        if (StringUtils.hasText(relativePath)) {
            if (TransactionSynchronizationManager.isSynchronizationActive()) {
                TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        try {
                            fileStorageService.delete(relativePath);
                            log.info("Physical resume file '{}' deleted post-commit", relativePath);
                        } catch (Exception ex) {
                            log.error("Failed to delete physical resume file '{}' post-commit", relativePath, ex);
                        }
                    }
                });
            } else {
                fileStorageService.delete(relativePath);
            }
        }

        log.info("Resume deleted successfully with ID: {}", id);
    }

    @Override
    public FileUploadResponse uploadResume(Long aboutId, String version, MultipartFile file) {
        log.info("Uploading resume file for About ID: {}", aboutId);

        About about = findAboutById(aboutId);
        Optional<Resume> existingOpt = resumeRepository.findByAbout(about);

        StorageResult storageResult;
        Resume resume;

        if (existingOpt.isPresent()) {
            resume = existingOpt.get();
            log.info("Existing resume record found with ID: {}. Replacing physical file.", resume.getId());

            storageResult = fileStorageService.replace(resume.getFileUrl(), file, FileCategory.RESUME);

            resume.setFileName(storageResult.getOriginalFilename());
            resume.setFileUrl(storageResult.getRelativePath()); // Store relative path
            resume.setFileType(FileType.PDF);
            resume.setFileSize(storageResult.getSize());
            if (StringUtils.hasText(version)) {
                resume.setVersion(version);
            }
        } else {
            log.info("No existing resume record found. Storing new file.");

            storageResult = fileStorageService.store(file, FileCategory.RESUME);

            resume = new Resume();
            resume.setAbout(about);
            resume.setFileName(storageResult.getOriginalFilename());
            resume.setFileUrl(storageResult.getRelativePath()); // Store relative path
            resume.setFileType(FileType.PDF);
            resume.setFileSize(storageResult.getSize());
            resume.setVersion(StringUtils.hasText(version) ? version : "1.0.0");
            resume.setActive(true);
        }

        resume = resumeRepository.save(resume);
        log.info("Resume database record updated successfully for ID: {}", resume.getId());

        return FileUploadResponse.builder()
                .filename(storageResult.getFilename())
                .originalFilename(storageResult.getOriginalFilename())
                .contentType(storageResult.getContentType())
                .size(storageResult.getSize())
                .url(storageResult.getUrl())
                .uploadedAt(LocalDateTime.now())
                .build();
    }

    private ResumeResponse mapToResponse(Resume resume) {
        ResumeResponse response = resumeMapper.toResponse(resume);
        if (response != null && StringUtils.hasText(resume.getFileUrl())) {
            response.setFileUrl(fileStorageService.generateUrl(resume.getFileUrl()));
        }
        return response;
    }

    private Resume findResumeById(Long id) {
        return resumeRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Resume not found with ID: {}", id);
                    return new ResourceNotFoundException("Resume", "id", id);
                });
    }

    private About findAboutById(Long id) {
        return aboutRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("About information not found with ID: {}", id);
                    return new ResourceNotFoundException("About", "id", id);
                });
    }

}
