package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.common.pagination.PaginationRequest;
import com.arafath.portfolio.common.pagination.PaginationUtils;
import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.YouTubeVideoRequest;
import com.arafath.portfolio.dto.response.YouTubeVideoResponse;
import com.arafath.portfolio.service.interfaces.YouTubeVideoService;
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
@RequestMapping("/api/v1/admin/youtube-videos")
@Tag(name = "Admin YouTube video API", description = "Administrative endpoints for managing portfolio YouTube video records.")
public class AdminYouTubeVideoController {

    private static final Sort DEFAULT_YOUTUBE_VIDEO_SORT = Sort.by(
            Sort.Order.asc("displayOrder"),
            Sort.Order.asc("id")
    );

    private final YouTubeVideoService youTubeVideoService;

    @GetMapping("/page")
    @Operation(summary = "Get YouTube video page")
    public ResponseEntity<ApiResponse<PageResponse<YouTubeVideoResponse>>> getPage(
            @Valid PaginationRequest paginationRequest) {

        Pageable pageable = PaginationUtils.toPageable(paginationRequest, DEFAULT_YOUTUBE_VIDEO_SORT);
        PageResponse<YouTubeVideoResponse> response = youTubeVideoService.getPage(pageable);

        return ResponseEntity.ok(ApiResponse.success("YouTube video page retrieved successfully.", response));
    }

    @PostMapping
    @Operation(summary = "Create YouTube video")
    public ResponseEntity<ApiResponse<YouTubeVideoResponse>> create(@Valid @RequestBody YouTubeVideoRequest request) {

        YouTubeVideoResponse response = youTubeVideoService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("YouTube video created successfully.", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get YouTube video by ID")
    public ResponseEntity<ApiResponse<YouTubeVideoResponse>> getById(@PathVariable Long id) {

        YouTubeVideoResponse response = youTubeVideoService.getById(id);

        return ResponseEntity.ok(ApiResponse.success("YouTube video retrieved successfully.", response));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update YouTube video")
    public ResponseEntity<ApiResponse<YouTubeVideoResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody YouTubeVideoRequest request) {

        YouTubeVideoResponse response = youTubeVideoService.update(id, request);

        return ResponseEntity.ok(ApiResponse.success("YouTube video updated successfully.", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete YouTube video")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        youTubeVideoService.delete(id);

        return ResponseEntity.ok(ApiResponse.success("YouTube video deleted successfully."));
    }
}
