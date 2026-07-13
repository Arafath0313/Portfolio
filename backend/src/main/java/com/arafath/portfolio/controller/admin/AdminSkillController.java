package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.common.pagination.PaginationRequest;
import com.arafath.portfolio.common.pagination.PaginationUtils;
import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.SkillRequest;
import com.arafath.portfolio.dto.response.SkillResponse;
import com.arafath.portfolio.service.interfaces.SkillService;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("/api/v1/admin/skills")
@Tag(name = "Admin Skill API", description = "Administrative endpoints for managing portfolio skills.")
public class AdminSkillController {

    private static final Sort DEFAULT_SKILL_SORT = Sort.by(
            Sort.Order.asc("displayOrder"),
            Sort.Order.asc("id")
    );

    private final SkillService skillService;

    @GetMapping("/page")
    @Operation(summary = "Get skill page")
    public ResponseEntity<ApiResponse<PageResponse<SkillResponse>>> getPage(
            @Valid PaginationRequest paginationRequest) {

        Pageable pageable = PaginationUtils.toPageable(paginationRequest, DEFAULT_SKILL_SORT);
        PageResponse<SkillResponse> response = skillService.getPage(pageable);

        return ResponseEntity.ok(ApiResponse.success("Skill page retrieved successfully.", response));
    }

    @PostMapping
    @Operation(summary = "Create skill")
    public ResponseEntity<ApiResponse<SkillResponse>> create(@Valid @RequestBody SkillRequest request) {

        SkillResponse response = skillService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Skill created successfully.", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get skill by ID")
    public ResponseEntity<ApiResponse<SkillResponse>> getById(@PathVariable Long id) {

        SkillResponse response = skillService.getById(id);

        return ResponseEntity.ok(ApiResponse.success("Skill retrieved successfully.", response));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update skill")
    public ResponseEntity<ApiResponse<SkillResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody SkillRequest request) {

        SkillResponse response = skillService.update(id, request);

        return ResponseEntity.ok(ApiResponse.success("Skill updated successfully.", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete skill")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        skillService.delete(id);

        return ResponseEntity.ok(ApiResponse.success("Skill deleted successfully."));
    }
}
