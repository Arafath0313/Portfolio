package com.arafath.portfolio.storage.validation;

import com.arafath.portfolio.storage.enums.FileCategory;
import com.arafath.portfolio.storage.exception.FileValidationException;
import com.arafath.portfolio.storage.util.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * Executes a validation pipeline in a strict order:
 * 1. Empty file
 * 2. File size
 * 3. Extension
 * 4. MIME type
 * 5. Image/PDF integrity
 */
@Component
@RequiredArgsConstructor
public class FileValidator {

    private final MediaTypeValidator mediaTypeValidator;
    private final ImageValidator imageValidator;

    private static final long MAX_IMAGE_SIZE = 5 * 1024 * 1024L; // 5MB limit for images
    private static final long MAX_DOC_SIZE = 10 * 1024 * 1024L;  // 10MB limit for resumes

    /**
     * Validates file upload in the specified sequence.
     *
     * @param file the MultipartFile to validate
     * @param category the targeted FileCategory
     */
    public void validateUpload(MultipartFile file, FileCategory category) {
        // 1. Empty file validation
        if (file == null || file.isEmpty()) {
            throw new FileValidationException("Uploaded file is empty.");
        }

        // 2. File size validation
        long sizeLimit = (category == FileCategory.RESUME) ? MAX_DOC_SIZE : MAX_IMAGE_SIZE;
        if (file.getSize() > sizeLimit) {
            throw new FileValidationException("File size exceeds the allowed limit of " + (sizeLimit / (1024 * 1024)) + "MB.");
        }

        // 3. Extension & 4. MIME type validation
        String originalFilename = FileUtils.cleanFilename(file.getOriginalFilename());
        mediaTypeValidator.validate(originalFilename, file.getContentType(), category);

        // 5. Image/PDF integrity validation
        boolean isPdf = (category == FileCategory.RESUME);
        imageValidator.validateIntegrity(file, isPdf);
    }
}
