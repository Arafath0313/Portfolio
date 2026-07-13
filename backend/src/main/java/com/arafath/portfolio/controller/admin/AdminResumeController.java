package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.ResumeRequest;
import com.arafath.portfolio.dto.response.ResumeResponse;
import com.arafath.portfolio.service.interfaces.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Administrative REST controller for managing portfolio resume records.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/resume")
@Tag(
        name = "Admin Resume API",
        description = "Administrative endpoints for managing portfolio resume records."
)
public class AdminResumeController {

    private final ResumeService resumeService;

    /**
     * Creates a new portfolio resume record.
     *
     * @param request resume creation request payload
     * @return successful API response containing the created resume record
     */
    @PostMapping
    @Operation(summary = "Create Resume")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "Resume created successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid resume request payload."
            )
    })
    public ResponseEntity<ApiResponse<ResumeResponse>> create(
            @Valid @RequestBody ResumeRequest request) {

        ResumeResponse response = resumeService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Resume created successfully.",
                        response
                ));
    }

    /**
     * Retrieves a portfolio resume record by its identifier.
     *
     * @param id resume identifier
     * @return successful API response containing the requested resume record
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get Resume by ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Resume retrieved successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Resume not found."
            )
    })
    public ResponseEntity<ApiResponse<ResumeResponse>> getById(
            @PathVariable Long id) {

        ResumeResponse response = resumeService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Resume retrieved successfully.",
                        response
                )
        );
    }

    /**
     * Updates an existing portfolio resume record.
     *
     * @param id resume identifier
     * @param request resume update request payload
     * @return successful API response containing the updated resume record
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update Resume")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Resume updated successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid resume request payload."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Resume not found."
            )
    })
    public ResponseEntity<ApiResponse<ResumeResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody ResumeRequest request) {

        ResumeResponse response = resumeService.update(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Resume updated successfully.",
                        response
                )
        );
    }

    /**
     * Deletes a portfolio resume record by its identifier.
     *
     * @param id resume identifier
     * @return successful API response without payload
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Resume")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Resume deleted successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Resume not found."
            )
    })
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        resumeService.delete(id);

        return ResponseEntity.ok(
                ApiResponse.success("Resume deleted successfully.")
        );
    }

    /**
     * Uploads or replaces the portfolio resume file.
     *
     * @param aboutId the profile owner ID
     * @param version optional resume version
     * @param file the resume MultipartFile (PDF)
     * @return response carrying upload details
     */
    @PostMapping("/upload")
    @Operation(summary = "Upload/Replace Resume File")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Resume file uploaded successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid request or file."
            )
    })
    public ResponseEntity<ApiResponse<com.arafath.portfolio.storage.dto.FileUploadResponse>> uploadResume(
            @RequestParam("aboutId") Long aboutId,
            @RequestParam(value = "version", required = false) String version,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {

        com.arafath.portfolio.storage.dto.FileUploadResponse response = resumeService.uploadResume(aboutId, version, file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Resume file uploaded successfully.",
                        response
                )
        );
    }

}
