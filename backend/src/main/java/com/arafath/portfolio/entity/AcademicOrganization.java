package com.arafath.portfolio.entity;

import java.time.LocalDate;

import com.arafath.portfolio.entity.base.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "academic_organizations")
public class AcademicOrganization extends BaseEntity {

    @NotBlank
    @Size(max = 150)
    @Column(name = "organization_name", nullable = false, length = 150)
    private String organizationName;

    @NotBlank
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String role;

    @Size(max = 1000)
    @Column(length = 1000)
    private String description;

    @Size(max = 255)
    @Column(length = 255)
    private String logo;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

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
