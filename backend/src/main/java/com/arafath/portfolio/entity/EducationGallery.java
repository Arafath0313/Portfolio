package com.arafath.portfolio.entity;

import java.time.LocalDate;

import com.arafath.portfolio.entity.base.BaseEntity;
import com.arafath.portfolio.entity.enums.EducationGalleryCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "education_galleries")
public class EducationGallery extends BaseEntity {

    @NotBlank
    @Size(max = 255)
    @Column(name = "image_url", nullable = false, length = 255)
    private String imageUrl;

    @Size(max = 150)
    @Column(length = 150)
    private String title;

    @Size(max = 500)
    @Column(length = 500)
    private String caption;

    @Column(name = "event_date")
    private LocalDate eventDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EducationGalleryCategory category;

    @NotNull
    @Column(nullable = false)
    private Boolean active = true;

    @PositiveOrZero
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "education_id", nullable = false)
    private Education education;

}
