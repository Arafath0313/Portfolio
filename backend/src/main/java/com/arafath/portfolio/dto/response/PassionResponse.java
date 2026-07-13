package com.arafath.portfolio.dto.response;

import com.arafath.portfolio.entity.enums.ContentPlatform;
import com.arafath.portfolio.entity.enums.PassionCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PassionResponse {
    private Long id;
    private String title;
    private String description;
    private PassionCategory category;
    private ContentPlatform contentPlatform;
    private String thumbnail;
    private String externalUrl;
    private Boolean featured;
    private Boolean featuredHome;
    private Boolean active;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
