package com.arafath.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class CertificationRequest {

    @NotBlank(message = "Certification title is required.")
    @Size(max = 150, message = "Certification title cannot exceed 150 characters.")
    private String title;

    @NotBlank(message = "Issuer is required.")
    @Size(max = 100, message = "Issuer cannot exceed 100 characters.")
    private String issuer;

    @NotNull(message = "Issue date is required.")
    @PastOrPresent(message = "Issue date cannot be in the future.")
    private LocalDate issueDate;

    private LocalDate expiryDate;

    @Size(max = 100, message = "Credential ID cannot exceed 100 characters.")
    private String credentialId;

    @Size(max = 255, message = "Credential URL cannot exceed 255 characters.")
    private String credentialUrl;

    @Size(max = 255, message = "Image URL cannot exceed 255 characters.")
    private String imageUrl;

    @NotNull(message = "Display order is required.")
    @PositiveOrZero(message = "Display order cannot be negative.")
    private Integer displayOrder;

    @NotNull(message = "Active status is required.")
    private Boolean active;

}
