package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.SkillRequest;
import com.arafath.portfolio.dto.response.SkillResponse;
import com.arafath.portfolio.entity.Skill;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.SkillMapper;
import com.arafath.portfolio.repository.SkillRepository;
import com.arafath.portfolio.service.interfaces.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    @Override
    public SkillResponse create(SkillRequest request) {

        log.info("Creating skill with name: {}", request.getName());

        if (skillRepository.existsByNameIgnoreCase(request.getName())) {
            log.warn("Duplicate skill name detected: {}", request.getName());
            throw new DuplicateResourceException("Skill", "name", request.getName());
        }

        Skill skill = skillMapper.toEntity(request);
        skill = skillRepository.save(skill);

        log.info("Skill created successfully with ID: {}", skill.getId());

        return skillMapper.toResponse(skill);
    }

    @Override
    public SkillResponse update(Long id, SkillRequest request) {

        log.info("Updating skill with ID: {}", id);

        Skill skill = findSkillById(id);

        if (!skill.getName().equalsIgnoreCase(request.getName())
                && skillRepository.existsByNameIgnoreCase(request.getName())) {
            log.warn("Duplicate skill name detected: {}", request.getName());
            throw new DuplicateResourceException("Skill", "name", request.getName());
        }

        skillMapper.updateEntityFromRequest(request, skill);
        skill = skillRepository.save(skill);

        log.info("Skill updated successfully with ID: {}", skill.getId());

        return skillMapper.toResponse(skill);
    }

    @Override
    @Transactional(readOnly = true)
    public SkillResponse getById(Long id) {

        log.info("Fetching skill with ID: {}", id);

        Skill skill = findSkillById(id);

        log.info("Skill retrieved successfully with ID: {}", id);

        return skillMapper.toResponse(skill);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SkillResponse> getAll() {

        log.info("Fetching all skills.");

        List<Skill> skills = skillRepository.findAll(Sort.by(Sort.Direction.ASC, "displayOrder", "id"));

        log.info("Retrieved {} skill(s) successfully.", skills.size());

        return skills.stream()
                .map(skillMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<SkillResponse> getPage(Pageable pageable) {

        log.info(
                "Fetching skill page. page={}, size={}, sort={}",
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pageable.getSort()
        );

        return PageResponse.from(
                skillRepository.findAll(pageable)
                        .map(skillMapper::toResponse)
        );
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting skill with ID: {}", id);

        Skill skill = findSkillById(id);
        skillRepository.delete(skill);

        log.info("Skill deleted successfully with ID: {}", id);
    }

    private Skill findSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Skill not found with ID: {}", id);
                    return new ResourceNotFoundException("Skill", "id", id);
                });
    }
}
