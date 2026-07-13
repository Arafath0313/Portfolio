package com.arafath.portfolio.dto.response;
import com.arafath.portfolio.entity.enums.EducationEventType;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Getter @Setter @NoArgsConstructor
public class EducationEventResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate eventDate;
    private EducationEventType eventType;
    private String image;
    private String externalUrl;
    private Boolean featured;
    private Boolean active;
    private Integer displayOrder;
    private Long educationId;
    private String educationUniversityName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}