package com.arafath.portfolio.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ProjectImageUploadResponse {

    private final Long id;

    private final String imageUrl;

    private final String caption;

    private final Integer displayOrder;

    private final Boolean active;

    private final Long projectId;

    private final String projectTitle;

    private final String filename;

    private final String originalFilename;

    private final String contentType;

    private final long size;

    private final String url;

    private final LocalDateTime uploadedAt;
}
