package com.arafath.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProjectImageRequest {

    @NotBlank(message = "Image URL is required.")
    @Size(max = 255, message = "Image URL cannot exceed 255 characters.")
    private String imageUrl;

    @Size(max = 255, message = "Caption cannot exceed 255 characters.")
    private String caption;

    @NotNull(message = "Display order is required.")
    @PositiveOrZero(message = "Display order cannot be negative.")
    private Integer displayOrder;

    @NotNull(message = "Active status is required.")
    private Boolean active;

    @NotNull(message = "Project ID is required.")
    private Long projectId;

}
