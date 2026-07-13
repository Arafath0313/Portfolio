package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.common.pagination.PaginationRequest;
import com.arafath.portfolio.common.pagination.PaginationUtils;
import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.ProjectRequest;
import com.arafath.portfolio.dto.response.ProjectImageResponse;
import com.arafath.portfolio.dto.response.ProjectImageUploadResponse;
import com.arafath.portfolio.dto.response.ProjectResponse;
import com.arafath.portfolio.service.interfaces.ProjectImageService;
import com.arafath.portfolio.service.interfaces.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Administrative REST controller for managing portfolio project records.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/projects")
@Tag(
        name = "Admin Project API",
        description = "Administrative endpoints for managing portfolio project records."
)
public class AdminProjectController {

    private static final Sort DEFAULT_PROJECT_SORT = Sort.by(
            Sort.Order.asc("displayOrder"),
            Sort.Order.asc("id")
    );

    private final ProjectService projectService;
    private final ProjectImageService projectImageService;

    @GetMapping("/page")
    @Operation(summary = "Get project page")
    public ResponseEntity<ApiResponse<PageResponse<ProjectResponse>>> getPage(
            @Valid PaginationRequest paginationRequest) {

        Pageable pageable = PaginationUtils.toPageable(
                paginationRequest,
                DEFAULT_PROJECT_SORT
        );

        PageResponse<ProjectResponse> response = projectService.getPage(pageable);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Project page retrieved successfully.",
                        response
                )
        );
    }

    /**
     * Creates a new portfolio project record.
     *
     * @param request project creation request payload
     * @return successful API response containing the created project record
     */
    @PostMapping
    @Operation(summary = "Create Project")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "Project created successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid project request payload."
            )
    })
    public ResponseEntity<ApiResponse<ProjectResponse>> create(
            @Valid @RequestBody ProjectRequest request) {

        ProjectResponse response = projectService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Project created successfully.",
                        response
                ));
    }

    /**
     * Retrieves a portfolio project record by its identifier.
     *
     * @param id project identifier
     * @return successful API response containing the requested project record
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get Project by ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project retrieved successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project not found."
            )
    })
    public ResponseEntity<ApiResponse<ProjectResponse>> getById(
            @PathVariable Long id) {

        ProjectResponse response = projectService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Project retrieved successfully.",
                        response
                )
        );
    }

    @GetMapping("/{id}/images")
    @Operation(summary = "Get project images")
    public ResponseEntity<ApiResponse<List<ProjectImageResponse>>> getImages(
            @PathVariable Long id) {

        List<ProjectImageResponse> response = projectImageService.getByProjectId(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Project images retrieved successfully.",
                        response
                )
        );
    }

    /**
     * Updates an existing portfolio project record.
     *
     * @param id project identifier
     * @param request project update request payload
     * @return successful API response containing the updated project record
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update Project")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project updated successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid project request payload."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project not found."
            )
    })
    public ResponseEntity<ApiResponse<ProjectResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request) {

        ProjectResponse response = projectService.update(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Project updated successfully.",
                        response
                )
        );
    }

    /**
     * Deletes a portfolio project record by its identifier.
     *
     * @param id project identifier
     * @return successful API response without payload
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Project")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project deleted successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project not found."
            )
    })
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        projectService.delete(id);

        return ResponseEntity.ok(
                ApiResponse.success("Project deleted successfully.")
        );
    }

    /**
     * Uploads an image and associates it with the project.
     *
     * @param id project ID
     * @param file the MultipartFile image
     * @param caption optional caption
     * @param displayOrder optional display order
     * @return response carrying upload details
     */
    @PostMapping("/{id}/images")
    @Operation(summary = "Upload Project Image")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project image uploaded successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid request or file."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project not found."
            )
    })
    public ResponseEntity<ApiResponse<ProjectImageUploadResponse>> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file,
            @RequestParam(value = "caption", required = false) String caption,
            @RequestParam(value = "displayOrder", required = false) Integer displayOrder) {

        ProjectImageUploadResponse response = projectImageService.uploadProjectImage(id, file, caption, displayOrder);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Project image uploaded successfully.",
                        response
                )
        );
    }

    /**
     * Uploads or replaces the thumbnail for a project.
     * Returns the updated ProjectResponse so the caller can refresh immediately.
     *
     * @param id   project identifier
     * @param file the thumbnail image file (JPEG, PNG, or WebP)
     * @return successful API response containing the updated project record
     */
    @PostMapping("/{id}/thumbnail")
    @Operation(summary = "Upload/Replace Project Thumbnail")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project thumbnail uploaded successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid request or file."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project not found."
            )
    })
    public ResponseEntity<ApiResponse<ProjectResponse>> uploadThumbnail(
            @PathVariable Long id,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {

        ProjectResponse response = projectService.uploadProjectThumbnail(id, file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Project thumbnail uploaded successfully.",
                        response
                )
        );
    }

    /**
     * Deletes a project image by its identifier.
     *
     * @param imageId image identifier
     * @return successful API response without payload
     */
    @DeleteMapping("/images/{imageId}")
    @Operation(summary = "Delete Project Image")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project image deleted successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project image not found."
            )
    })
    public ResponseEntity<ApiResponse<Void>> deleteImage(
            @PathVariable Long imageId) {

        projectImageService.delete(imageId);

        return ResponseEntity.ok(
                ApiResponse.success("Project image deleted successfully.")
        );
    }
}
