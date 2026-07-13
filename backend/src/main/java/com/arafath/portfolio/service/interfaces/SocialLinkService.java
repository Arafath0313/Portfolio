package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.SocialLinkRequest;
import com.arafath.portfolio.dto.response.SocialLinkResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SocialLinkService {

    SocialLinkResponse create(SocialLinkRequest request);

    SocialLinkResponse update(Long id, SocialLinkRequest request);

    SocialLinkResponse getById(Long id);

    List<SocialLinkResponse> getAll();

    PageResponse<SocialLinkResponse> getPage(Pageable pageable);

    void delete(Long id);
}
