package com.arafath.portfolio.dto.request;
import com.arafath.portfolio.entity.enums.EducationStatus;
import com.arafath.portfolio.entity.enums.StudyMode;
import jakarta.validation.constraints.*;
import lombok.*;
@Getter @Setter @NoArgsConstructor
public class EducationRequest {
    @NotBlank @Size(max = 150) private String universityName;
    @Size(max = 255) private String universityLogo;
    @Size(max = 255) private String universityWebsite;
    @NotBlank @Size(max = 150) private String degree;
    @Size(max = 100) private String faculty;
    @Size(max = 100) private String department;
    @NotNull @PositiveOrZero private Integer enrollmentYear;
    @PositiveOrZero private Integer expectedGraduationYear;
    @Size(max = 50) private String currentAcademicYear;
    @Size(max = 50) private String currentSemester;
    private StudyMode studyMode;
    private Double gpa;
    @NotNull private EducationStatus status;
    @Size(max = 2000) private String academicSummary;
    @NotNull private Boolean active;
    @NotNull @PositiveOrZero private Integer displayOrder;
}