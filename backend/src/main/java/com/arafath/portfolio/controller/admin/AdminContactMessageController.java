package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.common.pagination.PaginationRequest;
import com.arafath.portfolio.common.pagination.PaginationUtils;
import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.ContactMessagePatchRequest;
import com.arafath.portfolio.dto.request.ContactMessageRequest;
import com.arafath.portfolio.dto.response.ContactMessageResponse;
import com.arafath.portfolio.service.interfaces.ContactMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/contact")
@Tag(name = "Admin Contact Message API", description = "Administrative endpoints for managing portfolio contact message records.")
public class AdminContactMessageController {

    private static final Sort DEFAULT_CONTACT_MESSAGE_SORT = Sort.by(
            Sort.Order.desc("receivedAt"),
            Sort.Order.desc("id")
    );

    private final ContactMessageService contactMessageService;

    @GetMapping
    @Operation(summary = "Get contact messages")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Contact messages retrieved successfully.")
    })
    public ResponseEntity<ApiResponse<List<ContactMessageResponse>>> getAll() {

        List<ContactMessageResponse> contactMessages = contactMessageService.getAll();

        return ResponseEntity.ok(ApiResponse.success("Contact messages retrieved successfully.", contactMessages));
    }

    @GetMapping("/page")
    @Operation(summary = "Get contact message page")
    public ResponseEntity<ApiResponse<PageResponse<ContactMessageResponse>>> getPage(
            @Valid PaginationRequest paginationRequest) {

        Pageable pageable = PaginationUtils.toPageable(paginationRequest, DEFAULT_CONTACT_MESSAGE_SORT);
        PageResponse<ContactMessageResponse> response = contactMessageService.getPage(pageable);

        return ResponseEntity.ok(ApiResponse.success("Contact message page retrieved successfully.", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get contact message by ID")
    public ResponseEntity<ApiResponse<ContactMessageResponse>> getById(@PathVariable Long id) {

        ContactMessageResponse response = contactMessageService.getById(id);

        return ResponseEntity.ok(ApiResponse.success("Contact message retrieved successfully.", response));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update contact message")
    public ResponseEntity<ApiResponse<ContactMessageResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody ContactMessageRequest request) {

        ContactMessageResponse response = contactMessageService.update(id, request);

        return ResponseEntity.ok(ApiResponse.success("Contact message updated successfully.", response));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Patch contact message workflow state")
    public ResponseEntity<ApiResponse<ContactMessageResponse>> patch(
            @PathVariable Long id,
            @Valid @RequestBody ContactMessagePatchRequest request) {

        ContactMessageResponse response = contactMessageService.patch(id, request);

        return ResponseEntity.ok(ApiResponse.success("Contact message updated successfully.", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete contact message")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        contactMessageService.delete(id);

        return ResponseEntity.ok(ApiResponse.success("Contact message deleted successfully."));
    }
}
