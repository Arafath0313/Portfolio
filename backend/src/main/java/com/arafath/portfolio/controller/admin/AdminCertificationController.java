package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.common.pagination.PaginationRequest;
import com.arafath.portfolio.common.pagination.PaginationUtils;
import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.CertificationRequest;
import com.arafath.portfolio.dto.response.CertificationResponse;
import com.arafath.portfolio.service.interfaces.CertificationService;
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
@RequestMapping({"/api/v1/admin/certifications", "/api/v1/admin/certificates"})
@Tag(name = "Admin Certification API", description = "Administrative endpoints for managing portfolio certification records.")
public class AdminCertificationController {

    private static final Sort DEFAULT_CERTIFICATION_SORT = Sort.by(
            Sort.Order.asc("displayOrder"),
            Sort.Order.asc("id")
    );

    private final CertificationService certificationService;

    @GetMapping("/page")
    @Operation(summary = "Get certification page")
    public ResponseEntity<ApiResponse<PageResponse<CertificationResponse>>> getPage(
            @Valid PaginationRequest paginationRequest) {

        Pageable pageable = PaginationUtils.toPageable(paginationRequest, DEFAULT_CERTIFICATION_SORT);
        PageResponse<CertificationResponse> response = certificationService.getPage(pageable);

        return ResponseEntity.ok(ApiResponse.success("Certification page retrieved successfully.", response));
    }

    @PostMapping
    @Operation(summary = "Create Certification")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Certification created successfully."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid certification request payload.")
    })
    public ResponseEntity<ApiResponse<CertificationResponse>> create(@Valid @RequestBody CertificationRequest request) {

        CertificationResponse response = certificationService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Certification created successfully.", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Certification by ID")
    public ResponseEntity<ApiResponse<CertificationResponse>> getById(@PathVariable Long id) {

        CertificationResponse response = certificationService.getById(id);

        return ResponseEntity.ok(ApiResponse.success("Certification retrieved successfully.", response));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Certification")
    public ResponseEntity<ApiResponse<CertificationResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody CertificationRequest request) {

        CertificationResponse response = certificationService.update(id, request);

        return ResponseEntity.ok(ApiResponse.success("Certification updated successfully.", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Certification")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        certificationService.delete(id);

        return ResponseEntity.ok(ApiResponse.success("Certification deleted successfully."));
    }

    @PostMapping("/{id}/image")
    @Operation(summary = "Upload/Replace Certification Image")
    public ResponseEntity<ApiResponse<com.arafath.portfolio.storage.dto.FileUploadResponse>> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {

        com.arafath.portfolio.storage.dto.FileUploadResponse response = certificationService.uploadCertificateImage(id, file);

        return ResponseEntity.ok(ApiResponse.success("Certification image uploaded successfully.", response));
    }
}
