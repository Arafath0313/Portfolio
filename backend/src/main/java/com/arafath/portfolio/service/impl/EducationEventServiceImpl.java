package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.EducationEventRequest;
import com.arafath.portfolio.dto.response.EducationEventResponse;
import com.arafath.portfolio.entity.EducationEvent;
import com.arafath.portfolio.entity.Education;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.EducationEventMapper;
import com.arafath.portfolio.repository.EducationEventRepository;
import com.arafath.portfolio.service.interfaces.EducationService;
import com.arafath.portfolio.service.interfaces.EducationEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationEventServiceImpl implements EducationEventService {

    private final EducationEventRepository repository;
    private final EducationEventMapper mapper;
    private final EducationService educationService;

    @Override
    @Transactional
    public EducationEventResponse create(EducationEventRequest request) {
        Education education = educationService.getEntityById(request.getEducationId());
        EducationEvent entity = mapper.toEntity(request);
        entity.setEducation(education);
        return mapper.toResponse(repository.save(entity));
    }

    @Override
    @Transactional
    public EducationEventResponse update(Long id, EducationEventRequest request) {
        EducationEvent entity = getEntityById(id);
        
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
    public EducationEventResponse getById(Long id) {
        return mapper.toResponse(getEntityById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EducationEventResponse> getAllByEducationAdmin(Long educationId, Pageable pageable) {
        if (educationId != null) {
            return repository.findByEducationId(educationId, pageable).map(mapper::toResponse);
        }
        return repository.findAll(pageable).map(mapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EducationEventResponse> getAllByEducationPublic(Long educationId) {
        return repository.findByEducationIdAndActiveTrueOrderByDisplayOrderAsc(educationId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<EducationEventResponse> getAllPublic() {
        return repository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    private EducationEvent getEntityById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EducationEvent", "id", id));
    }
}