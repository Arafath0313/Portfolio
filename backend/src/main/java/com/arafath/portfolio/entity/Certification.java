package com.arafath.portfolio.entity;

import java.time.LocalDate;

import com.arafath.portfolio.entity.base.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "certifications")
public class Certification extends BaseEntity {

    @NotBlank
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String title;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String issuer;

    @NotNull
    @PastOrPresent
    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Size(max = 100)
    @Column(name = "credential_id", length = 100)
    private String credentialId;

    @Size(max = 255)
    @Column(name = "credential_url", length = 255)
    private String credentialUrl;

    @Size(max = 255)
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @PositiveOrZero
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @NotNull
    @Column(nullable = false)
    private Boolean active = true;

}