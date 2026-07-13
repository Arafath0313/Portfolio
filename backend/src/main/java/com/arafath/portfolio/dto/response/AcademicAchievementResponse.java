package com.arafath.portfolio.dto.response;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Getter @Setter @NoArgsConstructor
public class AcademicAchievementResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate achievementDate;
    private String certificateImage;
    private String externalUrl;
    private Boolean active;
    private Integer displayOrder;
    private Long educationId;
    private String educationUniversityName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}