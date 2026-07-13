package com.arafath.portfolio.entity;

import com.arafath.portfolio.entity.base.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "site_settings")
public class SiteSetting extends BaseEntity {

    @NotBlank
    @Size(max = 100)
    @Column(name = "site_title", nullable = false, length = 100)
    private String siteTitle;

    @Size(max = 255)
    @Column(name = "logo_url", length = 255)
    private String logoUrl;

    @Size(max = 255)
    @Column(name = "favicon_url", length = 255)
    private String faviconUrl;

    @NotBlank
    @Email
    @Size(max = 100)
    @Column(name = "contact_email", nullable = false, length = 100)
    private String contactEmail;

    @Size(max = 30)
    @Column(name = "contact_phone", length = 30)
    private String contactPhone;

    @Size(max = 255)
    @Column(length = 255)
    private String address;

    @Size(max = 150)
    @Column(name = "seo_title", length = 150)
    private String seoTitle;

    @Column(name = "seo_description", columnDefinition = "TEXT")
    private String seoDescription;

    @Size(max = 255)
    @Column(name = "footer_text", length = 255)
    private String footerText;

    @NotNull
    @Column(nullable = false)
    private Boolean active = true;

}