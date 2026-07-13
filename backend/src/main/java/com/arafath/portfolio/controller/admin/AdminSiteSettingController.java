package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.SiteSettingRequest;
import com.arafath.portfolio.dto.response.SiteSettingResponse;
import com.arafath.portfolio.service.interfaces.SiteSettingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Administrative REST controller for managing portfolio site setting records.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/site-settings")
@Tag(
        name = "Admin Site settings API",
        description = "Administrative endpoints for managing portfolio site setting records."
)
public class AdminSiteSettingController {

    private final SiteSettingService siteSettingService;

    /**
     * Creates a new portfolio site setting record.
     *
     * @param request site setting creation request payload
     * @return successful API response containing the created site setting record
     */
    @PostMapping
    @Operation(summary = "Create Site settings")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "Site settings created successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid site setting request payload."
            )
    })
    public ResponseEntity<ApiResponse<SiteSettingResponse>> create(
            @Valid @RequestBody SiteSettingRequest request) {

        SiteSettingResponse response = siteSettingService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Site settings created successfully.",
                        response
                ));
    }

    /**
     * Retrieves a portfolio site setting record by its identifier.
     *
     * @param id site setting identifier
     * @return successful API response containing the requested site setting record
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get Site settings by ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Site settings retrieved successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Site settings not found."
            )
    })
    public ResponseEntity<ApiResponse<SiteSettingResponse>> getById(
            @PathVariable Long id) {

        SiteSettingResponse response = siteSettingService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Site settings retrieved successfully.",
                        response
                )
        );
    }

    /**
     * Updates an existing portfolio site setting record.
     *
     * @param id site setting identifier
     * @param request site setting update request payload
     * @return successful API response containing the updated site setting record
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update Site settings")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Site settings updated successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid site setting request payload."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Site settings not found."
            )
    })
    public ResponseEntity<ApiResponse<SiteSettingResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody SiteSettingRequest request) {

        SiteSettingResponse response = siteSettingService.update(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Site settings updated successfully.",
                        response
                )
        );
    }

    /**
     * Deletes a portfolio site setting record by its identifier.
     *
     * @param id site setting identifier
     * @return successful API response without payload
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Site settings")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Site settings deleted successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Site settings not found."
            )
    })
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        siteSettingService.delete(id);

        return ResponseEntity.ok(
                ApiResponse.success("Site settings deleted successfully.")
        );
    }

    /**
     * Uploads site logo image.
     *
     * @param file the logo image file
     * @return response containing upload details
     */
    @PostMapping("/logo")
    @Operation(summary = "Upload Site Logo")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Site logo uploaded successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid file or request."
            )
    })
    public ResponseEntity<ApiResponse<com.arafath.portfolio.storage.dto.FileUploadResponse>> uploadLogo(
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {

        com.arafath.portfolio.storage.dto.FileUploadResponse response = siteSettingService.uploadLogo(file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Site logo uploaded successfully.",
                        response
                )
        );
    }

    /**
     * Uploads site favicon image.
     *
     * @param file the favicon image file
     * @return response containing upload details
     */
    @PostMapping("/favicon")
    @Operation(summary = "Upload Site Favicon")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Site favicon uploaded successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid file or request."
            )
    })
    public ResponseEntity<ApiResponse<com.arafath.portfolio.storage.dto.FileUploadResponse>> uploadFavicon(
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {

        com.arafath.portfolio.storage.dto.FileUploadResponse response = siteSettingService.uploadFavicon(file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Site favicon uploaded successfully.",
                        response
                )
        );
    }

}
