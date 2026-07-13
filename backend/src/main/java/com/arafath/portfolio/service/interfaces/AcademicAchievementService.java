package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.AcademicAchievementRequest;
import com.arafath.portfolio.dto.response.AcademicAchievementResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface AcademicAchievementService {
    AcademicAchievementResponse create(AcademicAchievementRequest request);
    AcademicAchievementResponse update(Long id, AcademicAchievementRequest request);
    void delete(Long id);
    AcademicAchievementResponse getById(Long id);
    Page<AcademicAchievementResponse> getAllByEducationAdmin(Long educationId, Pageable pageable);
    List<AcademicAchievementResponse> getAllByEducationPublic(Long educationId);
    List<AcademicAchievementResponse> getAllPublic();
}