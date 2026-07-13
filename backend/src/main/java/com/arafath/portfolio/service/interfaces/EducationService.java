package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.EducationRequest;
import com.arafath.portfolio.dto.response.EducationResponse;
import com.arafath.portfolio.entity.Education;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface EducationService {
    EducationResponse create(EducationRequest request);
    EducationResponse update(Long id, EducationRequest request);
    void delete(Long id);
    EducationResponse getById(Long id);
    Page<EducationResponse> getAllAdmin(String keyword, Pageable pageable);
    List<EducationResponse> getAllPublic();
    Education getEntityById(Long id);
}