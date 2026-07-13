package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.EducationRequest;
import com.arafath.portfolio.dto.response.EducationResponse;
import com.arafath.portfolio.service.interfaces.EducationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/education")
@RequiredArgsConstructor
public class AdminEducationController {

    private final EducationService service;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<EducationResponse>>> getAll(
            @RequestParam(required = false) String keyword,
            Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getAllAdmin(keyword, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EducationResponse>> create(
            @Valid @RequestBody EducationRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Education created successfully", service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody EducationRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Education updated successfully", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Education deleted successfully"));
    }
}