package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.AboutRequest;
import com.arafath.portfolio.dto.response.AboutResponse;
import com.arafath.portfolio.service.interfaces.AboutService;
import com.arafath.portfolio.storage.dto.FileUploadResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    /**
     * Uploads or replaces the profile image for the About record.
     * Stores the file under uploads/about/ and saves the relative path in the DB.
     *
     * @param id   About record identifier
     * @param file the profile image file (JPEG, PNG, WebP)
     * @return response carrying upload details and the public /media/ URL
     */
    @PostMapping("/{id}/profile-image")
    @Operation(summary = "Upload/Replace Profile Image")
    public ResponseEntity<ApiResponse<FileUploadResponse>> uploadProfileImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        FileUploadResponse response = aboutService.uploadProfileImage(id, file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Profile image uploaded successfully.",
                        response
                )
        );
    }

    /**
     * Uploads or replaces the cover image for the About record.
     * Stores the file under uploads/about/ and saves the relative path in the DB.
     *
     * @param id   About record identifier
     * @param file the cover image file (JPEG, PNG, WebP)
     * @return response carrying upload details and the public /media/ URL
     */
    @PostMapping("/{id}/cover-image")
    @Operation(summary = "Upload/Replace Cover Image")
    public ResponseEntity<ApiResponse<FileUploadResponse>> uploadCoverImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        FileUploadResponse response = aboutService.uploadCoverImage(id, file);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Cover image uploaded successfully.",
                        response
                )
        );
    }

}
