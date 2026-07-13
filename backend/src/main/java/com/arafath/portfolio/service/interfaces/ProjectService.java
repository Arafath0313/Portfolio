package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.ProjectRequest;
import com.arafath.portfolio.dto.response.ProjectResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {

    ProjectResponse create(ProjectRequest request);

    ProjectResponse update(Long id, ProjectRequest request);

    ProjectResponse getById(Long id);

    List<ProjectResponse> getAll();

    PageResponse<ProjectResponse> getPage(Pageable pageable);

    void delete(Long id);

    ProjectResponse uploadProjectThumbnail(Long id, MultipartFile file);
}

