package com.arafath.portfolio.controller.admin;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.common.pagination.PaginationRequest;
import com.arafath.portfolio.common.pagination.PaginationUtils;
import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.request.AdminRequest;
import com.arafath.portfolio.dto.response.AdminResponse;
import com.arafath.portfolio.service.interfaces.AdminService;
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

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/admins")
@Tag(name = "Admin Admin API", description = "Administrative endpoints for managing admin records.")
public class AdminAdminController {

    private static final Sort DEFAULT_ADMIN_SORT = Sort.by(Sort.Order.asc("id"));

    private final AdminService adminService;

    @PostMapping
    @Operation(summary = "Create Admin")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Admin created successfully."),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid admin request payload.")
    })
    public ResponseEntity<ApiResponse<AdminResponse>> create(@Valid @RequestBody AdminRequest request) {

        AdminResponse response = adminService.create(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Admin created successfully.", response));
    }

    @GetMapping
    @Operation(summary = "Get Admins")
    public ResponseEntity<ApiResponse<List<AdminResponse>>> getAll() {

        List<AdminResponse> admins = adminService.getAll();

        return ResponseEntity.ok(ApiResponse.success("Admins retrieved successfully.", admins));
    }

    @GetMapping("/page")
    @Operation(summary = "Get admin page")
    public ResponseEntity<ApiResponse<PageResponse<AdminResponse>>> getPage(
            @Valid PaginationRequest paginationRequest) {

        Pageable pageable = PaginationUtils.toPageable(paginationRequest, DEFAULT_ADMIN_SORT);
        PageResponse<AdminResponse> response = adminService.getPage(pageable);

        return ResponseEntity.ok(ApiResponse.success("Admin page retrieved successfully.", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Admin by ID")
    public ResponseEntity<ApiResponse<AdminResponse>> getById(@PathVariable Long id) {

        AdminResponse response = adminService.getById(id);

        return ResponseEntity.ok(ApiResponse.success("Admin retrieved successfully.", response));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Admin")
    public ResponseEntity<ApiResponse<AdminResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody AdminRequest request) {

        AdminResponse response = adminService.update(id, request);

        return ResponseEntity.ok(ApiResponse.success("Admin updated successfully.", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Admin")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        adminService.delete(id);

        return ResponseEntity.ok(ApiResponse.success("Admin deleted successfully."));
    }
}
