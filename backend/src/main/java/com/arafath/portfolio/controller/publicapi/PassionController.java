package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.common.pagination.PaginationRequest;
import com.arafath.portfolio.common.pagination.PaginationUtils;
import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.PassionResponse;
import com.arafath.portfolio.entity.enums.ContentPlatform;
import com.arafath.portfolio.entity.enums.PassionCategory;
import com.arafath.portfolio.service.interfaces.PassionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/beyond-coding")
@Tag(
        name = "Public Beyond Coding API",
        description = "Public APIs for portfolio passion information (Beyond Coding)"
)
public class PassionController {

    private final PassionService passionService;

    private static final Sort DEFAULT_PASSION_SORT = Sort.by(
            Sort.Order.asc("displayOrder"),
            Sort.Order.desc("id")
    );

    @GetMapping
    @Operation(summary = "Get portfolio Passions")
    public ResponseEntity<ApiResponse<List<PassionResponse>>> getAll() {
        List<PassionResponse> passions = passionService.getAll();
        return ResponseEntity.ok(ApiResponse.success("Passions retrieved successfully.", passions));
    }

    @GetMapping("/page")
    @Operation(summary = "Get filtered passion page")
    public ResponseEntity<ApiResponse<PageResponse<PassionResponse>>> getFilteredPage(
            @Valid PaginationRequest paginationRequest,
            @RequestParam(required = false) PassionCategory category,
            @RequestParam(required = false) ContentPlatform platform,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) String search) {

        Pageable pageable = PaginationUtils.toPageable(paginationRequest, DEFAULT_PASSION_SORT);
        
        // Pass active=true for public endpoints
        PageResponse<PassionResponse> response = passionService.getFilteredPage(
                category, platform, featured, true, search, pageable
        );

        return ResponseEntity.ok(ApiResponse.success("Passions page retrieved successfully.", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get portfolio Passion by ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Passion retrieved successfully."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Passion not found.")
    })
    public ResponseEntity<ApiResponse<PassionResponse>> getById(@PathVariable Long id) {
        PassionResponse response = passionService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Passion retrieved successfully.", response));
    }
}
