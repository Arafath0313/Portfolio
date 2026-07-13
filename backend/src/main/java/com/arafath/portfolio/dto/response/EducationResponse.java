package com.arafath.portfolio.dto.response;
import com.arafath.portfolio.entity.enums.EducationStatus;
import com.arafath.portfolio.entity.enums.StudyMode;
import lombok.*;
import java.time.LocalDateTime;
@Getter @Setter @NoArgsConstructor
public class EducationResponse {
    private Long id;
    private String universityName;
    private String universityLogo;
    private String universityWebsite;
    private String degree;
    private String faculty;
    private String department;
    private Integer enrollmentYear;
    private Integer expectedGraduationYear;
    private String currentAcademicYear;
    private String currentSemester;
    private StudyMode studyMode;
    private Double gpa;
    private EducationStatus status;
    private String academicSummary;
    private Boolean active;
    private Integer displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}