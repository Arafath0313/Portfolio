package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.AboutRequest;
import com.arafath.portfolio.dto.response.AboutResponse;
import com.arafath.portfolio.service.interfaces.AboutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/about")
@Tag(
        name = "Admin About API",
        description = "Administrative endpoints for managing portfolio About information."
)
public class AdminAboutController {

    private final AboutService aboutService;

    @PostMapping
    @Operation(summary = "Create About information")
    public ResponseEntity<ApiResponse<AboutResponse>> create(
            @Valid @RequestBody AboutRequest request) {

        AboutResponse response = aboutService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "About information created successfully.",
                        response
                ));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get About information by ID")
    public ResponseEntity<ApiResponse<AboutResponse>> getById(
            @PathVariable Long id) {

        AboutResponse response = aboutService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "About information retrieved successfully.",
                        response
                )
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update About information")
    public ResponseEntity<ApiResponse<AboutResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody AboutRequest request) {

        AboutResponse response = aboutService.update(id, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "About information updated successfully.",
                        response
                )
        );
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete About information")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        aboutService.delete(id);

        return ResponseEntity.ok(
                ApiResponse.success("About information deleted successfully.")
        );
    }

}
