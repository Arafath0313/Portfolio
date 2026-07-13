package com.arafath.portfolio.dto.request;
import com.arafath.portfolio.entity.enums.EducationGalleryCategory;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
@Getter @Setter @NoArgsConstructor
public class EducationGalleryRequest {
    @NotBlank @Size(max = 255) private String imageUrl;
    @Size(max = 150) private String title;
    @Size(max = 500) private String caption;
    private LocalDate eventDate;
    @NotNull private EducationGalleryCategory category;
    @NotNull private Boolean active;
    @NotNull @PositiveOrZero private Integer displayOrder;
    @NotNull private Long educationId;
}