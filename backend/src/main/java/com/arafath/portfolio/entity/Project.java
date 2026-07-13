package com.arafath.portfolio.entity;

import java.util.ArrayList;
import java.util.List;

import com.arafath.portfolio.entity.base.BaseEntity;
import com.arafath.portfolio.enums.ProjectStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
@Entity
@Table(name = "projects")
public class Project extends BaseEntity {

    @NotBlank
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String title;

    @NotBlank
    @Size(max = 170)
    @Column(nullable = false, unique = true, length = 170)
    private String slug;

    @NotBlank
    @Size(max = 300)
    @Column(nullable = false, length = 300)
    private String shortDescription;

    @NotBlank
    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String description;

    @Size(max = 255)
    @Column(length = 255)
    private String technologies;

    @Size(max = 255)
    @Column(name = "github_url", length = 255)
    private String githubUrl;

    @Size(max = 255)
    @Column(name = "live_demo_url", length = 255)
    private String liveDemoUrl;

    @Size(max = 255)
    @Column(name = "thumbnail_url", length = 255)
    private String thumbnailUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status;

    @NotNull
    @Column(nullable = false)
    private Boolean featured = false;

    @NotNull
    @Column(nullable = false)
    private Boolean active = true;

    @PositiveOrZero
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @OneToMany(
            mappedBy = "project",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<ProjectImage> images = new ArrayList<>();

}