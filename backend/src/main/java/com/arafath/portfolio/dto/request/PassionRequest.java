package com.arafath.portfolio.dto.request;

import com.arafath.portfolio.entity.enums.ContentPlatform;
import com.arafath.portfolio.entity.enums.PassionCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PassionRequest {

    @NotBlank(message = "Title is required.")
    @Size(max = 200, message = "Title cannot exceed 200 characters.")
    private String title;

    private String description;

    @NotNull(message = "Category is required.")
    private PassionCategory category;

    @NotNull(message = "Platform is required.")
    private ContentPlatform contentPlatform;

    @Size(max = 255, message = "Thumbnail URL cannot exceed 255 characters.")
    private String thumbnail;

    @Size(max = 500, message = "External URL cannot exceed 500 characters.")
    private String externalUrl;

    @NotNull(message = "Featured status is required.")
    private Boolean featured;

    @NotNull(message = "Featured on Home status is required.")
    private Boolean featuredHome;

    @NotNull(message = "Active status is required.")
    private Boolean active;

    @NotNull(message = "Display order is required.")
    private Integer displayOrder;
}
