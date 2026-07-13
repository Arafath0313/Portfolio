package com.arafath.portfolio.dto.response;

import com.arafath.portfolio.enums.SkillCategory;
import com.arafath.portfolio.enums.SkillLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class SkillResponse {

    private Long id;

    private String name;

    private SkillCategory category;

    private SkillLevel level;

    private String icon;

    private Integer displayOrder;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
