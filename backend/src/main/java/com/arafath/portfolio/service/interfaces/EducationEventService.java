package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.EducationEventRequest;
import com.arafath.portfolio.dto.response.EducationEventResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface EducationEventService {
    EducationEventResponse create(EducationEventRequest request);
    EducationEventResponse update(Long id, EducationEventRequest request);
    void delete(Long id);
    EducationEventResponse getById(Long id);
    Page<EducationEventResponse> getAllByEducationAdmin(Long educationId, Pageable pageable);
    List<EducationEventResponse> getAllByEducationPublic(Long educationId);
    List<EducationEventResponse> getAllPublic();
}