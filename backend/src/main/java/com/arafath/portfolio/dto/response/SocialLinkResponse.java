package com.arafath.portfolio.dto.response;

import com.arafath.portfolio.enums.SocialPlatform;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class SocialLinkResponse {

    private Long id;

    private SocialPlatform platform;

    private String url;

    private String icon;

    private Integer displayOrder;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
