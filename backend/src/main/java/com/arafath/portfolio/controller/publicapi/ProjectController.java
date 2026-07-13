package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.ProjectResponse;
import com.arafath.portfolio.service.interfaces.ProjectService;
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
 * Public REST controller that exposes read-only portfolio project endpoints.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/projects")
@Tag(
        name = "Public Project API",
        description = "Public APIs for portfolio project information"
)
public class ProjectController {

    private final ProjectService projectService;

    /**
     * Retrieves all portfolio project records.
     *
     * @return successful API response containing all project records
     */
    @GetMapping
    @Operation(summary = "Get portfolio Projects")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Projects retrieved successfully."
            )
    })
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getAll() {

        List<ProjectResponse> projects = projectService.getAll();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Projects retrieved successfully.",
                        projects
                )
        );
    }

    /**
     * Retrieves a portfolio project record by its identifier.
     *
     * @param id project identifier
     * @return successful API response containing the requested project record
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get portfolio Project by ID")
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
}
