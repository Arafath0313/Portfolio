package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.SocialLinkResponse;
import com.arafath.portfolio.service.interfaces.SocialLinkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Public REST controller that exposes read-only portfolio social link endpoints.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/social-links")
@Tag(
        name = "Public Social link API",
        description = "Public APIs for portfolio social link information"
)
public class SocialLinkController {

    private final SocialLinkService socialLinkService;

    /**
     * Retrieves all portfolio social link records.
     *
     * @return successful API response containing all social link records
     */
    @GetMapping
    @Operation(summary = "Get portfolio Social links")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Social links retrieved successfully."
            )
    })
    public ResponseEntity<ApiResponse<List<SocialLinkResponse>>> getAll() {

        List<SocialLinkResponse> socialLinks = socialLinkService.getAll();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Social links retrieved successfully.",
                        socialLinks
                )
        );
    }

    /**
     * Retrieves a portfolio social link record by its identifier.
     *
     * @param id social link identifier
     * @return successful API response containing the requested social link record
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get portfolio Social link by ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Social link retrieved successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Social link not found."
            )
    })
    public ResponseEntity<ApiResponse<SocialLinkResponse>> getById(
            @PathVariable Long id) {

        SocialLinkResponse response = socialLinkService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Social link retrieved successfully.",
                        response
                )
        );
    }
}
