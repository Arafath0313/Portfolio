package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.ResumeRequest;
import com.arafath.portfolio.dto.response.ResumeResponse;

public interface ResumeService {

    ResumeResponse create(ResumeRequest request);

    ResumeResponse update(Long id, ResumeRequest request);

    ResumeResponse getById(Long id);

    ResumeResponse get();

    void delete(Long id);

    com.arafath.portfolio.storage.dto.FileUploadResponse uploadResume(Long aboutId, String version, org.springframework.web.multipart.MultipartFile file);
}
