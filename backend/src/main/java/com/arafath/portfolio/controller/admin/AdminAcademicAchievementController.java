package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.AcademicAchievementRequest;
import com.arafath.portfolio.dto.response.AcademicAchievementResponse;
import com.arafath.portfolio.service.interfaces.AcademicAchievementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/education/achievements")
@RequiredArgsConstructor
public class AdminAcademicAchievementController {

    private final AcademicAchievementService service;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AcademicAchievementResponse>>> getAll(
            @RequestParam(required = false) Long educationId,
            Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getAllByEducationAdmin(educationId, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AcademicAchievementResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AcademicAchievementResponse>> create(
            @Valid @RequestBody AcademicAchievementRequest request) {
        return ResponseEntity.ok(ApiResponse.success("AcademicAchievement created successfully", service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AcademicAchievementResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody AcademicAchievementRequest request) {
        return ResponseEntity.ok(ApiResponse.success("AcademicAchievement updated successfully", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("AcademicAchievement deleted successfully"));
    }
}