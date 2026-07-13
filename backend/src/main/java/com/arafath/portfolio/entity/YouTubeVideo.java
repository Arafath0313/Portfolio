package com.arafath.portfolio.entity;

import java.time.LocalDate;

import com.arafath.portfolio.entity.base.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "youtube_videos")
public class YouTubeVideo extends BaseEntity {

    @NotBlank
    @Size(max = 200)
    @Column(nullable = false, length = 200)
    private String title;

    @NotBlank
    @Size(max = 50)
    @Column(name = "video_id", nullable = false, unique = true, length = 50)
    private String videoId;

    @Size(max = 255)
    @Column(name = "thumbnail_url", length = 255)
    private String thumbnailUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @PastOrPresent
    @Column(name = "published_at")
    private LocalDate publishedAt;

    @PositiveOrZero
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @NotNull
    @Column(nullable = false)
    private Boolean featured = false;

    @NotNull
    @Column(nullable = false)
    private Boolean active = true;

}