package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.AcademicAchievementRequest;
import com.arafath.portfolio.dto.response.AcademicAchievementResponse;
import com.arafath.portfolio.entity.AcademicAchievement;
import com.arafath.portfolio.entity.Education;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.AcademicAchievementMapper;
import com.arafath.portfolio.repository.AcademicAchievementRepository;
import com.arafath.portfolio.service.interfaces.EducationService;
import com.arafath.portfolio.service.interfaces.AcademicAchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicAchievementServiceImpl implements AcademicAchievementService {

    private final AcademicAchievementRepository repository;
    private final AcademicAchievementMapper mapper;
    private final EducationService educationService;

    @Override
    @Transactional
    public AcademicAchievementResponse create(AcademicAchievementRequest request) {
        Education education = educationService.getEntityById(request.getEducationId());
        AcademicAchievement entity = mapper.toEntity(request);
        entity.setEducation(education);
        return mapper.toResponse(repository.save(entity));
    }

    @Override
    @Transactional
    public AcademicAchievementResponse update(Long id, AcademicAchievementRequest request) {
        AcademicAchievement entity = getEntityById(id);
        
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
    public AcademicAchievementResponse getById(Long id) {
        return mapper.toResponse(getEntityById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AcademicAchievementResponse> getAllByEducationAdmin(Long educationId, Pageable pageable) {
        if (educationId != null) {
            return repository.findByEducationId(educationId, pageable).map(mapper::toResponse);
        }
        return repository.findAll(pageable).map(mapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AcademicAchievementResponse> getAllByEducationPublic(Long educationId) {
        return repository.findByEducationIdAndActiveTrueOrderByDisplayOrderAsc(educationId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<AcademicAchievementResponse> getAllPublic() {
        return repository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    private AcademicAchievement getEntityById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AcademicAchievement", "id", id));
    }
}