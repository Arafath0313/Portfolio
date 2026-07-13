package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.AboutResponse;
import com.arafath.portfolio.service.interfaces.AboutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/about")
@Tag(
        name = "Public About API",
        description = "Public APIs for portfolio about information"
)
public class AboutController {

    private final AboutService aboutService;

    @GetMapping
    @Operation(summary = "Get portfolio about information")
    public ResponseEntity<ApiResponse<AboutResponse>> getAbout() {

        AboutResponse about = aboutService.get();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "About information retrieved successfully.",
                        about
                )
        );
    }
}
