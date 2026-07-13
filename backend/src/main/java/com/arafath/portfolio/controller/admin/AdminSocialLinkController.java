package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.common.pagination.PaginationRequest;
import com.arafath.portfolio.common.pagination.PaginationUtils;
import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.SocialLinkRequest;
import com.arafath.portfolio.dto.response.SocialLinkResponse;
import com.arafath.portfolio.service.interfaces.SocialLinkService;
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
@RequestMapping("/api/v1/admin/social-links")
@Tag(name = "Admin Social link API", description = "Administrative endpoints for managing portfolio social link records.")
public class AdminSocialLinkController {

    private static final Sort DEFAULT_SOCIAL_LINK_SORT = Sort.by(
            Sort.Order.asc("displayOrder"),
            Sort.Order.asc("id")
    );

    private final SocialLinkService socialLinkService;

    @GetMapping("/page")
    @Operation(summary = "Get social link page")
    public ResponseEntity<ApiResponse<PageResponse<SocialLinkResponse>>> getPage(
            @Valid PaginationRequest paginationRequest) {

        Pageable pageable = PaginationUtils.toPageable(paginationRequest, DEFAULT_SOCIAL_LINK_SORT);
        PageResponse<SocialLinkResponse> response = socialLinkService.getPage(pageable);

        return ResponseEntity.ok(ApiResponse.success("Social link page retrieved successfully.", response));
    }

    @PostMapping
    @Operation(summary = "Create Social link")
    public ResponseEntity<ApiResponse<SocialLinkResponse>> create(@Valid @RequestBody SocialLinkRequest request) {

        SocialLinkResponse response = socialLinkService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Social link created successfully.", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Social link by ID")
    public ResponseEntity<ApiResponse<SocialLinkResponse>> getById(@PathVariable Long id) {

        SocialLinkResponse response = socialLinkService.getById(id);

        return ResponseEntity.ok(ApiResponse.success("Social link retrieved successfully.", response));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Social link")
    public ResponseEntity<ApiResponse<SocialLinkResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody SocialLinkRequest request) {

        SocialLinkResponse response = socialLinkService.update(id, request);

        return ResponseEntity.ok(ApiResponse.success("Social link updated successfully.", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Social link")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        socialLinkService.delete(id);

        return ResponseEntity.ok(ApiResponse.success("Social link deleted successfully."));
    }
}
