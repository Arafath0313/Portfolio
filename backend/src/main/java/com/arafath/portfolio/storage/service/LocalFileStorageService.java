package com.arafath.portfolio.storage.service;

import com.arafath.portfolio.storage.config.FileStorageProperties;
import com.arafath.portfolio.storage.dto.StorageResult;
import com.arafath.portfolio.storage.enums.FileCategory;
import com.arafath.portfolio.storage.exception.FileDeletionException;
import com.arafath.portfolio.storage.exception.FileStorageException;
import com.arafath.portfolio.storage.util.FilenameGenerator;
import com.arafath.portfolio.storage.util.PathUtils;
import com.arafath.portfolio.storage.validation.FileValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * Local filesystem implementation of {@link FileStorageService}.
 * Isolates all java.nio filesystem interactions.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LocalFileStorageService implements FileStorageService {

    private final FileStorageProperties properties;
    private final FileValidator fileValidator;

    private Path getRootLocation() {
        return Paths.get(properties.getUploadDir()).toAbsolutePath().normalize();
    }

    @Override
    public StorageResult store(MultipartFile file, FileCategory category) {
        log.info("Starting file upload validation and storage for category: {}", category);

        // 1-5. Validate upload sequentially
        fileValidator.validateUpload(file, category);

        try {
            // 6. Store file after validations pass
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String uniqueFilename = FilenameGenerator.generateUniqueName(originalFilename);

            Path categoryDir = getRootLocation().resolve(category.getFolderName()).normalize();
            Path targetLocation = PathUtils.verifyAndResolvePath(categoryDir, uniqueFilename);

            // Ensure categories folders exist
            Files.createDirectories(categoryDir);

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String relativePath = category.getFolderName() + "/" + uniqueFilename;
            String publicUrl = generateUrl(relativePath);

            // Register synchronization to clean up newly stored file if transaction rolls back
            if (TransactionSynchronizationManager.isSynchronizationActive()) {
                TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                    @Override
                    public void afterCompletion(int status) {
                        if (status == STATUS_ROLLED_BACK) {
                            try {
                                delete(relativePath);
                                log.info("Transaction rolled back: cleaned up newly stored file '{}'", relativePath);
                            } catch (Exception ex) {
                                log.error("Failed to clean up newly stored file '{}' after transaction rollback", relativePath, ex);
                            }
                        }
                    }
                });
                log.info("Registered rollback synchronization for newly stored file '{}'", relativePath);
            }

            log.info("Upload success: Unique Name: {}, Relative Path: {}, URL: {}",
                    uniqueFilename, relativePath, publicUrl);

            return StorageResult.builder()
                    .filename(uniqueFilename)
                    .originalFilename(originalFilename)
                    .relativePath(relativePath)
                    .url(publicUrl)
                    .contentType(file.getContentType())
                    .size(file.getSize())
                    .build();

        } catch (IOException e) {
            log.error("Upload failure: Could not store file for category {}", category, e);
            throw new FileStorageException("Failed to store file on disk.", e);
        }
    }

    @Override
    public StorageResult replace(String oldRelativePath, MultipartFile newFile, FileCategory category) {
        log.info("File replacement requested for '{}' in category {}", oldRelativePath, category);

        // 1. Upload the new file first (it gets stored with a new UUID path)
        StorageResult result = store(newFile, category);

        // 2. Schedule deletion of old file only after the DB transaction succeeds (commits)
        if (StringUtils.hasText(oldRelativePath) && exists(oldRelativePath)) {
            if (TransactionSynchronizationManager.isSynchronizationActive()) {
                TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        try {
                            delete(oldRelativePath);
                            log.info("File replacement: deleted old physical file '{}' after transaction commit", oldRelativePath);
                        } catch (Exception ex) {
                            log.error("File replacement failure: could not delete old physical file '{}'", oldRelativePath, ex);
                        }
                    }
                });
                log.info("Registered post-commit hook to delete old file '{}'", oldRelativePath);
            } else {
                delete(oldRelativePath);
                log.info("No transaction active. Deleted old file '{}' immediately.", oldRelativePath);
            }
        }

        return result;
    }

    @Override
    public void delete(String relativePath) {
        log.info("File deletion requested for relative path: {}", relativePath);
        if (!StringUtils.hasText(relativePath)) {
            return;
        }

        try {
            Path filePath = PathUtils.verifyAndResolvePath(getRootLocation(), relativePath);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                log.info("File deletion success: {}", relativePath);
            } else {
                log.warn("File deletion skipped: File not found at path: {}", relativePath);
            }
        } catch (IOException e) {
            log.error("File deletion failure: Could not delete physical file at path: {}", relativePath, e);
            throw new FileDeletionException("Failed to delete physical file from disk: " + relativePath, e);
        }
    }

    @Override
    public Resource load(String relativePath) {
        log.info("Loading resource: {}", relativePath);
        try {
            Path filePath = PathUtils.verifyAndResolvePath(getRootLocation(), relativePath);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new FileStorageException("File not found or not readable: " + relativePath);
            }
        } catch (MalformedURLException e) {
            throw new FileStorageException("Malformed URL for path: " + relativePath, e);
        }
    }

    @Override
    public boolean exists(String relativePath) {
        if (!StringUtils.hasText(relativePath)) {
            return false;
        }
        try {
            Path filePath = PathUtils.verifyAndResolvePath(getRootLocation(), relativePath);
            return Files.exists(filePath);
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public String generateUrl(String relativePath) {
        if (!StringUtils.hasText(relativePath)) {
            return "";
        }
        
        String normalized = PathUtils.normalizeRelativePath(relativePath);
        
        if (normalized.startsWith("/media/")) {
            return normalized;
        } else if (normalized.startsWith("media/")) {
            return "/" + normalized;
        }
        
        return "/media/" + normalized;
    }
}
