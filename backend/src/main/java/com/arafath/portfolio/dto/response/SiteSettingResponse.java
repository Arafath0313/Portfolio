package com.arafath.portfolio.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class SiteSettingResponse {

    private Long id;

    private String siteTitle;

    private String logoUrl;

    private String faviconUrl;

    private String contactEmail;

    private String contactPhone;

    private String address;

    private String seoTitle;

    private String seoDescription;

    private String footerText;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
