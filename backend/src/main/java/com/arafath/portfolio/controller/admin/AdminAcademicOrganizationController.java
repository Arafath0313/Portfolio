package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.AcademicOrganizationRequest;
import com.arafath.portfolio.dto.response.AcademicOrganizationResponse;
import com.arafath.portfolio.service.interfaces.AcademicOrganizationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/education/organizations")
@RequiredArgsConstructor
public class AdminAcademicOrganizationController {

    private final AcademicOrganizationService service;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AcademicOrganizationResponse>>> getAll(
            @RequestParam(required = false) Long educationId,
            Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getAllByEducationAdmin(educationId, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AcademicOrganizationResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AcademicOrganizationResponse>> create(
            @Valid @RequestBody AcademicOrganizationRequest request) {
        return ResponseEntity.ok(ApiResponse.success("AcademicOrganization created successfully", service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AcademicOrganizationResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody AcademicOrganizationRequest request) {
        return ResponseEntity.ok(ApiResponse.success("AcademicOrganization updated successfully", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("AcademicOrganization deleted successfully"));
    }
}