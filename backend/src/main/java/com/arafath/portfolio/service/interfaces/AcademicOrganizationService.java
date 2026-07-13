package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.AcademicOrganizationRequest;
import com.arafath.portfolio.dto.response.AcademicOrganizationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface AcademicOrganizationService {
    AcademicOrganizationResponse create(AcademicOrganizationRequest request);
    AcademicOrganizationResponse update(Long id, AcademicOrganizationRequest request);
    void delete(Long id);
    AcademicOrganizationResponse getById(Long id);
    Page<AcademicOrganizationResponse> getAllByEducationAdmin(Long educationId, Pageable pageable);
    List<AcademicOrganizationResponse> getAllByEducationPublic(Long educationId);
    List<AcademicOrganizationResponse> getAllPublic();
}