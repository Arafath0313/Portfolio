package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.CertificationResponse;
import com.arafath.portfolio.service.interfaces.CertificationService;
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
 * Public REST controller that exposes read-only portfolio certification endpoints.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/certifications")
@Tag(
        name = "Public Certification API",
        description = "Public APIs for portfolio certification information"
)
public class CertificationController {

    private final CertificationService certificationService;

    /**
     * Retrieves all portfolio certification records.
     *
     * @return successful API response containing all certification records
     */
    @GetMapping
    @Operation(summary = "Get portfolio Certifications")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Certifications retrieved successfully."
            )
    })
    public ResponseEntity<ApiResponse<List<CertificationResponse>>> getAll() {

        List<CertificationResponse> certifications = certificationService.getAll();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Certifications retrieved successfully.",
                        certifications
                )
        );
    }

    /**
     * Retrieves a portfolio certification record by its identifier.
     *
     * @param id certification identifier
     * @return successful API response containing the requested certification record
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get portfolio Certification by ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Certification retrieved successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Certification not found."
            )
    })
    public ResponseEntity<ApiResponse<CertificationResponse>> getById(
            @PathVariable Long id) {

        CertificationResponse response = certificationService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Certification retrieved successfully.",
                        response
                )
        );
    }
}
