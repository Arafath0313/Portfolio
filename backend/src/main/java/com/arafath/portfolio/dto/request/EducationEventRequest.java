package com.arafath.portfolio.dto.request;
import com.arafath.portfolio.entity.enums.EducationEventType;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
@Getter @Setter @NoArgsConstructor
public class EducationEventRequest {
    @NotBlank @Size(max = 150) private String title;
    @NotBlank @Size(max = 1000) private String description;
    @NotNull private LocalDate eventDate;
    @NotNull private EducationEventType eventType;
    @Size(max = 255) private String image;
    @Size(max = 255) private String externalUrl;
    @NotNull private Boolean featured;
    @NotNull private Boolean active;
    @NotNull @PositiveOrZero private Integer displayOrder;
    @NotNull private Long educationId;
}