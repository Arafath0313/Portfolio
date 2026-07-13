package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.YouTubeVideoRequest;
import com.arafath.portfolio.dto.response.YouTubeVideoResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface YouTubeVideoService {

    YouTubeVideoResponse create(YouTubeVideoRequest request);

    YouTubeVideoResponse update(Long id, YouTubeVideoRequest request);

    YouTubeVideoResponse getById(Long id);

    List<YouTubeVideoResponse> getAll();

    PageResponse<YouTubeVideoResponse> getPage(Pageable pageable);

    void delete(Long id);
}
