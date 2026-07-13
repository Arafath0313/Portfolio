package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.EducationGalleryRequest;
import com.arafath.portfolio.dto.response.EducationGalleryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface EducationGalleryService {
    EducationGalleryResponse create(EducationGalleryRequest request);
    EducationGalleryResponse update(Long id, EducationGalleryRequest request);
    void delete(Long id);
    EducationGalleryResponse getById(Long id);
    Page<EducationGalleryResponse> getAllByEducationAdmin(Long educationId, Pageable pageable);
    List<EducationGalleryResponse> getAllByEducationPublic(Long educationId);
    List<EducationGalleryResponse> getAllPublic();
}