package com.arafath.portfolio.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class YouTubeVideoResponse {

    private Long id;

    private String title;

    private String videoId;

    private String thumbnailUrl;

    private String description;

    private LocalDate publishedAt;

    private Integer displayOrder;

    private Boolean featured;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
