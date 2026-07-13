package com.arafath.portfolio.dto.request;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
@Getter @Setter @NoArgsConstructor
public class AcademicAchievementRequest {
    @NotBlank @Size(max = 150) private String title;
    @Size(max = 1000) private String description;
    @NotNull private LocalDate achievementDate;
    @Size(max = 255) private String certificateImage;
    @Size(max = 255) private String externalUrl;
    @NotNull private Boolean active;
    @NotNull @PositiveOrZero private Integer displayOrder;
    @NotNull private Long educationId;
}