package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.EducationEventRequest;
import com.arafath.portfolio.dto.response.EducationEventResponse;
import com.arafath.portfolio.service.interfaces.EducationEventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/education/events")
@RequiredArgsConstructor
public class AdminEducationEventController {

    private final EducationEventService service;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<EducationEventResponse>>> getAll(
            @RequestParam(required = false) Long educationId,
            Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getAllByEducationAdmin(educationId, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationEventResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", service.getById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EducationEventResponse>> create(
            @Valid @RequestBody EducationEventRequest request) {
        return ResponseEntity.ok(ApiResponse.success("EducationEvent created successfully", service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationEventResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody EducationEventRequest request) {
        return ResponseEntity.ok(ApiResponse.success("EducationEvent updated successfully", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("EducationEvent deleted successfully"));
    }
}