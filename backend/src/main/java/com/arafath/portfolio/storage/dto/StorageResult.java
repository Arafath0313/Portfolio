package com.arafath.portfolio.storage.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Internal storage outcome details, returned from {@link com.arafath.portfolio.storage.service.FileStorageService}.
 */
@Getter
@Builder
public class StorageResult {
    private final String filename;
    private final String originalFilename;
    private final String relativePath;
    private final String url;
    private final String contentType;
    private final long size;
}
