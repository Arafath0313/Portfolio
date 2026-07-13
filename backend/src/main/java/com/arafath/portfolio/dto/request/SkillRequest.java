package com.arafath.portfolio.dto.request;

import com.arafath.portfolio.enums.SkillCategory;
import com.arafath.portfolio.enums.SkillLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SkillRequest {

    @NotBlank(message = "Skill name is required.")
    @Size(max = 100, message = "Skill name cannot exceed 100 characters.")
    private String name;

    @NotNull(message = "Skill category is required.")
    private SkillCategory category;

    @NotNull(message = "Skill level is required.")
    private SkillLevel level;

    @Size(max = 255, message = "Icon cannot exceed 255 characters.")
    private String icon;

    @NotNull(message = "Display order is required.")
    @PositiveOrZero(message = "Display order cannot be negative.")
    private Integer displayOrder;

    @NotNull(message = "Active status is required.")
    private Boolean active;

}
