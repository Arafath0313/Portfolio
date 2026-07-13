package com.arafath.portfolio.dto.response;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Getter @Setter @NoArgsConstructor
public class AcademicOrganizationResponse {
    private Long id;
    private String organizationName;
    private String role;
    private String description;
    private String logo;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean active;
    private Integer displayOrder;
    private Long educationId;
    private String educationUniversityName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}