package com.arafath.portfolio.storage.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

/**
 * Standard REST API response DTO for file upload requests.
 */
@Getter
@Builder
public class FileUploadResponse {
    private final String filename;
    private final String originalFilename;
    private final String contentType;
    private final long size;
    private final String url;
    private final LocalDateTime uploadedAt;
}
