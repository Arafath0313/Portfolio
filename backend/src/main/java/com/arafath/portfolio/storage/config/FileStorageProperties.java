package com.arafath.portfolio.storage.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 * Configuration properties for file storage.
 * Values are loaded from application.yml using the "storage" prefix.
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "storage")
public class FileStorageProperties {

    /**
     * Root directory where uploaded files will be stored.
     */
    private String uploadDir;

    /**
     * Allowed MIME types for image uploads.
     */
    private List<String> allowedImageTypes;

    /**
     * Allowed MIME types for document uploads.
     */
    private List<String> allowedDocumentTypes;

    /**
     * Allowed file extensions for image uploads.
     */
    private List<String> allowedImageExtensions;

    /**
     * Allowed file extensions for document uploads.
     */
    private List<String> allowedDocumentExtensions;
}