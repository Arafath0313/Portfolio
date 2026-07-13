package com.arafath.portfolio.dto.request;

import com.arafath.portfolio.enums.ProjectStatus;
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
public class ProjectRequest {

    @NotBlank(message = "Project title is required.")
    @Size(max = 150, message = "Project title cannot exceed 150 characters.")
    private String title;

    @NotBlank(message = "Project slug is required.")
    @Size(max = 170, message = "Project slug cannot exceed 170 characters.")
    private String slug;

    @NotBlank(message = "Short description is required.")
    @Size(max = 300, message = "Short description cannot exceed 300 characters.")
    private String shortDescription;

    @NotBlank(message = "Project description is required.")
    private String description;

    @Size(max = 255, message = "Technologies cannot exceed 255 characters.")
    private String technologies;

    @Size(max = 255, message = "GitHub URL cannot exceed 255 characters.")
    private String githubUrl;

    @Size(max = 255, message = "Live demo URL cannot exceed 255 characters.")
    private String liveDemoUrl;

    @NotNull(message = "Project status is required.")
    private ProjectStatus status;

    @NotNull(message = "Featured status is required.")
    private Boolean featured;

    @NotNull(message = "Active status is required.")
    private Boolean active;

    @NotNull(message = "Display order is required.")
    @PositiveOrZero(message = "Display order cannot be negative.")
    private Integer displayOrder;

}
