package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.PassionRequest;
import com.arafath.portfolio.dto.response.PassionResponse;
import com.arafath.portfolio.storage.dto.FileUploadResponse;
import com.arafath.portfolio.entity.enums.ContentPlatform;
import com.arafath.portfolio.entity.enums.PassionCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PassionService {

    PassionResponse create(PassionRequest request);

    PassionResponse update(Long id, PassionRequest request);

    PassionResponse getById(Long id);

    List<PassionResponse> getAll();

    PageResponse<PassionResponse> getPage(Pageable pageable);
    
    PageResponse<PassionResponse> getFilteredPage(
        PassionCategory category,
        ContentPlatform platform,
        Boolean featured,
        Boolean active,
        String search,
        Pageable pageable
    );

    void delete(Long id);

    FileUploadResponse uploadThumbnail(Long id, MultipartFile file);
}
