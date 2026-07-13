package com.arafath.portfolio.entity;

import com.arafath.portfolio.entity.base.BaseEntity;
import com.arafath.portfolio.entity.enums.ContentPlatform;
import com.arafath.portfolio.entity.enums.PassionCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "passions")
public class Passion extends BaseEntity {

    @NotBlank
    @Size(max = 200)
    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private PassionCategory category;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "content_platform", nullable = false, length = 50)
    private ContentPlatform contentPlatform;

    @Size(max = 255)
    @Column(name = "thumbnail_url", length = 255)
    private String thumbnail;

    @Size(max = 500)
    @Column(name = "external_url", length = 500)
    private String externalUrl;

    @NotNull
    @Column(nullable = false)
    private Boolean featured = false;

    @NotNull
    @Column(name = "featured_home", nullable = false)
    private Boolean featuredHome = false;

    @NotNull
    @Column(nullable = false)
    private Boolean active = true;

    @NotNull
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;
}
