package com.arafath.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class YouTubeVideoRequest {

    @NotBlank(message = "Video title is required.")
    @Size(max = 200, message = "Video title cannot exceed 200 characters.")
    private String title;

    @NotBlank(message = "Video ID is required.")
    @Size(max = 50, message = "Video ID cannot exceed 50 characters.")
    private String videoId;

    @Size(max = 255, message = "Thumbnail URL cannot exceed 255 characters.")
    private String thumbnailUrl;

    private String description;

    @PastOrPresent(message = "Published date cannot be in the future.")
    private LocalDate publishedAt;

    @NotNull(message = "Display order is required.")
    @PositiveOrZero(message = "Display order cannot be negative.")
    private Integer displayOrder;

    @NotNull(message = "Featured status is required.")
    private Boolean featured;

    @NotNull(message = "Active status is required.")
    private Boolean active;

}
