package com.arafath.portfolio.dto.response;
import com.arafath.portfolio.entity.enums.EducationGalleryCategory;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Getter @Setter @NoArgsConstructor
public class EducationGalleryResponse {
    private Long id;
    private String imageUrl;
    private String title;
    private String caption;
    private LocalDate eventDate;
    private EducationGalleryCategory category;
    private Boolean active;
    private Integer displayOrder;
    private Long educationId;
    private String educationUniversityName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}