package com.arafath.portfolio.dto.request;

import com.arafath.portfolio.enums.SocialPlatform;
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
public class SocialLinkRequest {

    @NotNull(message = "Social platform is required.")
    private SocialPlatform platform;

    @NotBlank(message = "Social link URL is required.")
    @Size(max = 255, message = "Social link URL cannot exceed 255 characters.")
    private String url;

    @Size(max = 100, message = "Icon cannot exceed 100 characters.")
    private String icon;

    @NotNull(message = "Display order is required.")
    @PositiveOrZero(message = "Display order cannot be negative.")
    private Integer displayOrder;

    @NotNull(message = "Active status is required.")
    private Boolean active;

}
