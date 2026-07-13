package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.EducationRequest;
import com.arafath.portfolio.dto.response.EducationResponse;
import com.arafath.portfolio.entity.Education;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.EducationMapper;
import com.arafath.portfolio.repository.EducationRepository;
import com.arafath.portfolio.service.interfaces.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationServiceImpl implements EducationService {

    private final EducationRepository repository;
    private final EducationMapper mapper;

    @Override
    @Transactional
    public EducationResponse create(EducationRequest request) {
        Education entity = mapper.toEntity(request);
        return mapper.toResponse(repository.save(entity));
    }

    @Override
    @Transactional
    public EducationResponse update(Long id, EducationRequest request) {
        Education entity = getEntityById(id);
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
    public EducationResponse getById(Long id) {
        return mapper.toResponse(getEntityById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EducationResponse> getAllAdmin(String keyword, Pageable pageable) {
        Page<Education> page;
        if (keyword != null && !keyword.isBlank()) {
            page = repository.findByUniversityNameContainingIgnoreCase(keyword, pageable);
        } else {
            page = repository.findAll(pageable);
        }
        return page.map(mapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EducationResponse> getAllPublic() {
        return repository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public Education getEntityById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));
    }
}