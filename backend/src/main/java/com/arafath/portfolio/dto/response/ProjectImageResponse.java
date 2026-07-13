package com.arafath.portfolio.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ProjectImageResponse {

    private Long id;

    private String imageUrl;

    private String caption;

    private Integer displayOrder;

    private Boolean active;

    private Long projectId;

    private String projectTitle;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
