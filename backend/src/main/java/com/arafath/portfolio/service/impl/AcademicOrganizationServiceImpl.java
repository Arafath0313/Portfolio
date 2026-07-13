package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.AcademicOrganizationRequest;
import com.arafath.portfolio.dto.response.AcademicOrganizationResponse;
import com.arafath.portfolio.entity.AcademicOrganization;
import com.arafath.portfolio.entity.Education;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.AcademicOrganizationMapper;
import com.arafath.portfolio.repository.AcademicOrganizationRepository;
import com.arafath.portfolio.service.interfaces.EducationService;
import com.arafath.portfolio.service.interfaces.AcademicOrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicOrganizationServiceImpl implements AcademicOrganizationService {

    private final AcademicOrganizationRepository repository;
    private final AcademicOrganizationMapper mapper;
    private final EducationService educationService;

    @Override
    @Transactional
    public AcademicOrganizationResponse create(AcademicOrganizationRequest request) {
        Education education = educationService.getEntityById(request.getEducationId());
        AcademicOrganization entity = mapper.toEntity(request);
        entity.setEducation(education);
        return mapper.toResponse(repository.save(entity));
    }

    @Override
    @Transactional
    public AcademicOrganizationResponse update(Long id, AcademicOrganizationRequest request) {
        AcademicOrganization entity = getEntityById(id);
        
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
    public AcademicOrganizationResponse getById(Long id) {
        return mapper.toResponse(getEntityById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AcademicOrganizationResponse> getAllByEducationAdmin(Long educationId, Pageable pageable) {
        if (educationId != null) {
            return repository.findByEducationId(educationId, pageable).map(mapper::toResponse);
        }
        return repository.findAll(pageable).map(mapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AcademicOrganizationResponse> getAllByEducationPublic(Long educationId) {
        return repository.findByEducationIdAndActiveTrueOrderByDisplayOrderAsc(educationId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<AcademicOrganizationResponse> getAllPublic() {
        return repository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    private AcademicOrganization getEntityById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AcademicOrganization", "id", id));
    }
}