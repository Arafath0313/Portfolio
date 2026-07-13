package com.arafath.portfolio.dto.response;

import com.arafath.portfolio.enums.ProjectStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ProjectResponse {

    private Long id;

    private String title;

    private String slug;

    private String shortDescription;

    private String description;

    private String technologies;

    private String githubUrl;

    private String liveDemoUrl;

    private String thumbnailUrl;

    private ProjectStatus status;

    private Boolean featured;

    private Boolean active;

    private Integer displayOrder;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
