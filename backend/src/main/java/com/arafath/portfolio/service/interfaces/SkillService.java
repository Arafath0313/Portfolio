package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.SkillRequest;
import com.arafath.portfolio.dto.response.SkillResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SkillService {

    SkillResponse create(SkillRequest request);

    SkillResponse update(Long id, SkillRequest request);

    SkillResponse getById(Long id);

    List<SkillResponse> getAll();

    PageResponse<SkillResponse> getPage(Pageable pageable);

    void delete(Long id);
}
