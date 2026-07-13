package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.ResumeResponse;
import com.arafath.portfolio.service.interfaces.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public REST controller that exposes portfolio resume information.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/resume")
@Tag(
        name = "Public Resume API",
        description = "Public APIs for portfolio resume information"
)
public class ResumeController {

    private final ResumeService resumeService;

    /**
     * Retrieves portfolio resume information.
     *
     * @return successful API response containing portfolio resume information
     */
    @GetMapping
    @Operation(summary = "Get portfolio resume information")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Resume retrieved successfully."
            )
    })
    public ResponseEntity<ApiResponse<ResumeResponse>> get() {

        ResumeResponse resume = resumeService.get();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Resume retrieved successfully.",
                        resume
                )
        );
    }
}
