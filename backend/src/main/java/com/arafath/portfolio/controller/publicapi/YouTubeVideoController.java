package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.YouTubeVideoResponse;
import com.arafath.portfolio.service.interfaces.YouTubeVideoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Public REST controller that exposes read-only portfolio YouTube video endpoints.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/youtube-videos")
@Tag(
        name = "Public YouTube video API",
        description = "Public APIs for portfolio YouTube video information"
)
public class YouTubeVideoController {

    private final YouTubeVideoService youTubeVideoService;

    /**
     * Retrieves all portfolio YouTube video records.
     *
     * @return successful API response containing all YouTube video records
     */
    @GetMapping
    @Operation(summary = "Get portfolio YouTube videos")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "YouTube videos retrieved successfully."
            )
    })
    public ResponseEntity<ApiResponse<List<YouTubeVideoResponse>>> getAll() {

        List<YouTubeVideoResponse> youTubeVideos = youTubeVideoService.getAll();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "YouTube videos retrieved successfully.",
                        youTubeVideos
                )
        );
    }

    /**
     * Retrieves a portfolio YouTube video record by its identifier.
     *
     * @param id YouTube video identifier
     * @return successful API response containing the requested YouTube video record
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get portfolio YouTube video by ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "YouTube video retrieved successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "YouTube video not found."
            )
    })
    public ResponseEntity<ApiResponse<YouTubeVideoResponse>> getById(
            @PathVariable Long id) {

        YouTubeVideoResponse response = youTubeVideoService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "YouTube video retrieved successfully.",
                        response
                )
        );
    }
}
