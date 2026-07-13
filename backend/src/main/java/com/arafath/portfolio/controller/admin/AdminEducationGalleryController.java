package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.EducationGalleryRequest;
import com.arafath.portfolio.dto.response.EducationGalleryResponse;
import com.arafath.portfolio.service.interfaces.EducationGalleryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/education/galleries")
@RequiredArgsConstructor
public class AdminEducationGalleryController {

    private final EducationGalleryService service;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<EducationGalleryResponse>>> getAll(
            @RequestParam(required = false) Long educationId,
            Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getAllByEducationAdmin(educationId, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationGalleryResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EducationGalleryResponse>> create(
            @Valid @RequestBody EducationGalleryRequest request) {
        return ResponseEntity.ok(ApiResponse.success("EducationGallery created successfully", service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationGalleryResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody EducationGalleryRequest request) {
        return ResponseEntity.ok(ApiResponse.success("EducationGallery updated successfully", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("EducationGallery deleted successfully"));
    }
}