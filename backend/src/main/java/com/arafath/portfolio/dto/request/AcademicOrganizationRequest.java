package com.arafath.portfolio.dto.request;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
@Getter @Setter @NoArgsConstructor
public class AcademicOrganizationRequest {
    @NotBlank @Size(max = 150) private String organizationName;
    @NotBlank @Size(max = 150) private String role;
    @Size(max = 1000) private String description;
    @Size(max = 255) private String logo;
    @NotNull private LocalDate startDate;
    private LocalDate endDate;
    @NotNull private Boolean active;
    @NotNull @PositiveOrZero private Integer displayOrder;
    @NotNull private Long educationId;
}