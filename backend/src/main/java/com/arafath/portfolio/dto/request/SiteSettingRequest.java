package com.arafath.portfolio.dto.request;

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
public class SiteSettingRequest {

    @NotBlank(message = "Site title is required.")
    @Size(max = 100, message = "Site title cannot exceed 100 characters.")
    private String siteTitle;

    @Size(max = 255, message = "Logo URL cannot exceed 255 characters.")
    private String logoUrl;

    @Size(max = 255, message = "Favicon URL cannot exceed 255 characters.")
    private String faviconUrl;

    @NotBlank(message = "Contact email is required.")
    @Email(message = "Please provide a valid email address.")
    @Size(max = 100, message = "Contact email cannot exceed 100 characters.")
    private String contactEmail;

    @Size(max = 30, message = "Contact phone cannot exceed 30 characters.")
    private String contactPhone;

    @Size(max = 255, message = "Address cannot exceed 255 characters.")
    private String address;

    @Size(max = 150, message = "SEO title cannot exceed 150 characters.")
    private String seoTitle;

    private String seoDescription;

    @Size(max = 255, message = "Footer text cannot exceed 255 characters.")
    private String footerText;

    @NotNull(message = "Active status is required.")
    private Boolean active;

}
