package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.ProjectImageRequest;
import com.arafath.portfolio.dto.response.ProjectImageResponse;
import com.arafath.portfolio.dto.response.ProjectImageUploadResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectImageService {

    ProjectImageResponse create(ProjectImageRequest request);

    ProjectImageResponse update(Long id, ProjectImageRequest request);

    ProjectImageResponse getById(Long id);

    List<ProjectImageResponse> getAll();

    List<ProjectImageResponse> getByProjectId(Long projectId);

    void delete(Long id);

    ProjectImageUploadResponse uploadProjectImage(Long projectId, MultipartFile file, String caption, Integer displayOrder);
}
