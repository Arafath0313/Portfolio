package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.SiteSettingRequest;
import com.arafath.portfolio.dto.response.SiteSettingResponse;

public interface SiteSettingService {

    SiteSettingResponse create(SiteSettingRequest request);

    SiteSettingResponse update(Long id, SiteSettingRequest request);

    SiteSettingResponse getById(Long id);

    SiteSettingResponse get();

    void delete(Long id);

    com.arafath.portfolio.storage.dto.FileUploadResponse uploadLogo(org.springframework.web.multipart.MultipartFile file);

    com.arafath.portfolio.storage.dto.FileUploadResponse uploadFavicon(org.springframework.web.multipart.MultipartFile file);
}
