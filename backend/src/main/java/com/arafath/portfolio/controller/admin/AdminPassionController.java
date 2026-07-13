package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.common.pagination.PaginationRequest;
import com.arafath.portfolio.common.pagination.PaginationUtils;
import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.PassionRequest;
import com.arafath.portfolio.dto.response.PassionResponse;
import com.arafath.portfolio.service.interfaces.PassionService;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/passions")
@Tag(
        name = "Admin Passion API",
        description = "Administrative endpoints for managing portfolio passion records."
)
public class AdminPassionController {

    private static final Sort DEFAULT_PASSION_SORT = Sort.by(
            Sort.Order.asc("displayOrder"),
            Sort.Order.desc("id")
    );

    private final PassionService passionService;

    @GetMapping("/page")
    @Operation(summary = "Get passion page")
    public ResponseEntity<ApiResponse<PageResponse<PassionResponse>>> getPage(
            @Valid PaginationRequest paginationRequest) {

        Pageable pageable = PaginationUtils.toPageable(
                paginationRequest,
                DEFAULT_PASSION_SORT
        );

        PageResponse<PassionResponse> response = passionService.getPage(pageable);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Passion page retrieved successfully.",
                        response
                )
        );
    }

    @PostMapping
    @Operation(summary = "Create Passion")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Passion created successfully."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request payload.")
    })
    public ResponseEntity<ApiResponse<PassionResponse>> create(@Valid @RequestBody PassionRequest request) {

        PassionResponse response = passionService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Passion created successfully.", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Passion by ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Passion retrieved successfully."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Passion not found.")
    })
    public ResponseEntity<ApiResponse<PassionResponse>> getById(@PathVariable Long id) {

        PassionResponse response = passionService.getById(id);

        return ResponseEntity.ok(ApiResponse.success("Passion retrieved successfully.", response));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Passion")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Passion updated successfully."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request payload."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Passion not found.")
    })
    public ResponseEntity<ApiResponse<PassionResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody PassionRequest request) {

        PassionResponse response = passionService.update(id, request);

        return ResponseEntity.ok(ApiResponse.success("Passion updated successfully.", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Passion")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Passion deleted successfully."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Passion not found.")
    })
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        passionService.delete(id);

        return ResponseEntity.ok(ApiResponse.success("Passion deleted successfully."));
    }

    @PostMapping("/{id}/thumbnail")
    @Operation(summary = "Upload/Replace Passion Thumbnail")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Passion thumbnail uploaded successfully."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid file or request."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Passion not found.")
    })
    public ResponseEntity<ApiResponse<com.arafath.portfolio.storage.dto.FileUploadResponse>> uploadThumbnail(
            @PathVariable Long id,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {

        com.arafath.portfolio.storage.dto.FileUploadResponse response = passionService.uploadThumbnail(id, file);

        return ResponseEntity.ok(ApiResponse.success("Passion thumbnail uploaded successfully.", response));
    }
}
