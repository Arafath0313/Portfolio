package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.AdminRequest;
import com.arafath.portfolio.dto.response.AdminResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {

    AdminResponse create(AdminRequest request);

    AdminResponse update(Long id, AdminRequest request);

    AdminResponse getById(Long id);

    List<AdminResponse> getAll();

    PageResponse<AdminResponse> getPage(Pageable pageable);

    void delete(Long id);
}
