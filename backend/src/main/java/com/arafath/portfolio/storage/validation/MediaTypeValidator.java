package com.arafath.portfolio.storage.validation;

import com.arafath.portfolio.storage.config.FileStorageProperties;
import com.arafath.portfolio.storage.enums.FileCategory;
import com.arafath.portfolio.storage.exception.FileValidationException;
import com.arafath.portfolio.storage.util.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * Validates the MIME type and extension of files being uploaded based on Category.
 */
@Component
@RequiredArgsConstructor
public class MediaTypeValidator {

    private final FileStorageProperties properties;

    /**
     * Validates file extension and content type for the requested FileCategory.
     *
     * @param filename the file name
     * @param contentType the file MIME type
     * @param category the file category
     */
    public void validate(String filename, String contentType, FileCategory category) {
        String extension = FileUtils.getFileExtension(filename);
        if (!StringUtils.hasText(extension)) {
            throw new FileValidationException("File extension is missing.");
        }

        if (category == FileCategory.RESUME) {
            validateDocument(extension, contentType);
        } else {
            validateImage(extension, contentType);
        }
    }

    private void validateImage(String extension, String contentType) {
        List<String> allowedExtensions = properties.getAllowedImageExtensions();
        List<String> allowedTypes = properties.getAllowedImageTypes();

        if (allowedExtensions == null || !allowedExtensions.contains(extension.toLowerCase())) {
            throw new FileValidationException("Image extension '" + extension + "' is not allowed.");
        }

        if (contentType != null && allowedTypes != null && !allowedTypes.isEmpty()) {
            boolean matches = allowedTypes.stream()
                    .anyMatch(allowedType -> allowedType.equalsIgnoreCase(contentType));
            if (!matches) {
                throw new FileValidationException("Image MIME type '" + contentType + "' is not allowed.");
            }
        }
    }

    private void validateDocument(String extension, String contentType) {
        List<String> allowedExtensions = properties.getAllowedDocumentExtensions();
        List<String> allowedTypes = properties.getAllowedDocumentTypes();

        if (allowedExtensions == null || !allowedExtensions.contains(extension.toLowerCase())) {
            throw new FileValidationException("Document extension '" + extension + "' is not allowed.");
        }

        if (contentType != null && allowedTypes != null && !allowedTypes.isEmpty()) {
            boolean matches = allowedTypes.stream()
                    .anyMatch(allowedType -> allowedType.equalsIgnoreCase(contentType));
            if (!matches) {
                throw new FileValidationException("Document MIME type '" + contentType + "' is not allowed.");
            }
        }
    }
}
