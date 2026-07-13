package com.arafath.portfolio.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CertificationResponse {

    private Long id;

    private String title;

    private String issuer;

    private LocalDate issueDate;

    private LocalDate expiryDate;

    private String credentialId;

    private String credentialUrl;

    private String imageUrl;

    private Integer displayOrder;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
