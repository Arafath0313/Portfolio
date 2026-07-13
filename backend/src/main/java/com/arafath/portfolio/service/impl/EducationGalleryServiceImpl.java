package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.EducationGalleryRequest;
import com.arafath.portfolio.dto.response.EducationGalleryResponse;
import com.arafath.portfolio.entity.EducationGallery;
import com.arafath.portfolio.entity.Education;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.EducationGalleryMapper;
import com.arafath.portfolio.repository.EducationGalleryRepository;
import com.arafath.portfolio.service.interfaces.EducationService;
import com.arafath.portfolio.service.interfaces.EducationGalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationGalleryServiceImpl implements EducationGalleryService {

    private final EducationGalleryRepository repository;
    private final EducationGalleryMapper mapper;
    private final EducationService educationService;

    @Override
    @Transactional
    public EducationGalleryResponse create(EducationGalleryRequest request) {
        Education education = educationService.getEntityById(request.getEducationId());
        EducationGallery entity = mapper.toEntity(request);
        entity.setEducation(education);
        return mapper.toResponse(repository.save(entity));
    }

    @Override
    @Transactional
    public EducationGalleryResponse update(Long id, EducationGalleryRequest request) {
        EducationGallery entity = getEntityById(id);
        
        if (!entity.getEducation().getId().equals(request.getEducationId())) {
            Education newEducation = educationService.getEntityById(request.getEducationId());
            entity.setEducation(newEducation);
        }
        
        mapper.updateEntityFromRequest(request, entity);
        return mapper.toResponse(repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        repository.delete(getEntityById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public EducationGalleryResponse getById(Long id) {
        return mapper.toResponse(getEntityById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EducationGalleryResponse> getAllByEducationAdmin(Long educationId, Pageable pageable) {
        if (educationId != null) {
            return repository.findByEducationId(educationId, pageable).map(mapper::toResponse);
        }
        return repository.findAll(pageable).map(mapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EducationGalleryResponse> getAllByEducationPublic(Long educationId) {
        return repository.findByEducationIdAndActiveTrueOrderByDisplayOrderAsc(educationId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<EducationGalleryResponse> getAllPublic() {
        return repository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    private EducationGallery getEntityById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EducationGallery", "id", id));
    }
}