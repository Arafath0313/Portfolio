package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.CertificationRequest;
import com.arafath.portfolio.dto.response.CertificationResponse;
import com.arafath.portfolio.storage.dto.FileUploadResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CertificationService {

    CertificationResponse create(CertificationRequest request);

    CertificationResponse update(Long id, CertificationRequest request);

    CertificationResponse getById(Long id);

    List<CertificationResponse> getAll();

    PageResponse<CertificationResponse> getPage(Pageable pageable);

    void delete(Long id);

    FileUploadResponse uploadCertificateImage(Long id, MultipartFile file);
}
