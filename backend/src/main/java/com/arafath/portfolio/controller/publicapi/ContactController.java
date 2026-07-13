package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.ContactMessageRequest;
import com.arafath.portfolio.dto.response.ContactMessageResponse;
import com.arafath.portfolio.service.interfaces.ContactMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Public REST controller that exposes portfolio contact message endpoints.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/contact")
@Tag(
        name = "Public Contact message API",
        description = "Public APIs for portfolio contact message information"
)
public class ContactController {

    private final ContactMessageService contactMessageService;

    /**
     * Creates a new portfolio contact message record.
     *
     * @param request contact message request payload
     * @return successful API response containing the created contact message record
     */
    @PostMapping
    @Operation(summary = "Submit contact message")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "Contact message submitted successfully."
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid contact message request payload."
            )
    })
    public ResponseEntity<ApiResponse<ContactMessageResponse>> create(
            @Valid @RequestBody ContactMessageRequest request) {

        ContactMessageResponse response = contactMessageService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Contact message submitted successfully.",
                        response
                ));
    }
}
