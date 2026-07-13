package com.arafath.portfolio.entity;

import com.arafath.portfolio.entity.base.BaseEntity;
import com.arafath.portfolio.enums.SocialPlatform;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
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
@Entity
@Table(name = "social_links")
public class SocialLink extends BaseEntity {

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private SocialPlatform platform;

    @NotBlank
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String url;

    @Size(max = 100)
    @Column(length = 100)
    private String icon;

    @PositiveOrZero
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @NotNull
    @Column(nullable = false)
    private Boolean active = true;

}