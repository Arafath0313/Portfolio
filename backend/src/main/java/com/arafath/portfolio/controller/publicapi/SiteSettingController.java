package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.SiteSettingResponse;
import com.arafath.portfolio.service.interfaces.SiteSettingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public REST controller that exposes portfolio site setting information.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/site-settings")
@Tag(
        name = "Public Site settings API",
        description = "Public APIs for portfolio site setting information"
)
public class SiteSettingController {

    private final SiteSettingService siteSettingService;

    /**
     * Retrieves portfolio site setting information.
     *
     * @return successful API response containing portfolio site setting information
     */
    @GetMapping
    @Operation(summary = "Get portfolio site setting information")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Site settings retrieved successfully."
            )
    })
    public ResponseEntity<ApiResponse<SiteSettingResponse>> get() {

        SiteSettingResponse siteSetting = siteSettingService.get();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Site settings retrieved successfully.",
                        siteSetting
                )
        );
    }
}
