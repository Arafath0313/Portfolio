package com.arafath.portfolio.entity;

import java.util.ArrayList;
import java.util.List;

import com.arafath.portfolio.entity.base.BaseEntity;
import com.arafath.portfolio.entity.enums.EducationStatus;
import com.arafath.portfolio.entity.enums.StudyMode;

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
@Table(name = "educations")
public class Education extends BaseEntity {

    @NotBlank
    @Size(max = 150)
    @Column(name = "university_name", nullable = false, length = 150)
    private String universityName;

    @Size(max = 255)
    @Column(name = "university_logo", length = 255)
    private String universityLogo;

    @Size(max = 255)
    @Column(name = "university_website", length = 255)
    private String universityWebsite;

    @NotBlank
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String degree;

    @Size(max = 100)
    @Column(length = 100)
    private String faculty;

    @Size(max = 100)
    @Column(length = 100)
    private String department;

    @NotNull
    @PositiveOrZero
    @Column(name = "enrollment_year", nullable = false)
    private Integer enrollmentYear;

    @PositiveOrZero
    @Column(name = "expected_graduation_year")
    private Integer expectedGraduationYear;

    @Size(max = 50)
    @Column(name = "current_academic_year", length = 50)
    private String currentAcademicYear;

    @Size(max = 50)
    @Column(name = "current_semester", length = 50)
    private String currentSemester;

    @Enumerated(EnumType.STRING)
    @Column(name = "study_mode")
    private StudyMode studyMode;

    @Column
    private Double gpa;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EducationStatus status;

    @Size(max = 2000)
    @Column(name = "academic_summary", length = 2000)
    private String academicSummary;

    @NotNull
    @Column(nullable = false)
    private Boolean active = true;

    @PositiveOrZero
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @OneToMany(mappedBy = "education", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<EducationEvent> events = new ArrayList<>();

    @OneToMany(mappedBy = "education", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<AcademicOrganization> organizations = new ArrayList<>();

    @OneToMany(mappedBy = "education", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<EducationGallery> galleries = new ArrayList<>();

    @OneToMany(mappedBy = "education", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<AcademicAchievement> achievements = new ArrayList<>();

}
