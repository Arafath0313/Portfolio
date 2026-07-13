package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.YouTubeVideoRequest;
import com.arafath.portfolio.dto.response.YouTubeVideoResponse;
import com.arafath.portfolio.entity.YouTubeVideo;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.YouTubeVideoMapper;
import com.arafath.portfolio.repository.YouTubeVideoRepository;
import com.arafath.portfolio.service.interfaces.YouTubeVideoService;
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
public class YouTubeVideoServiceImpl implements YouTubeVideoService {

    private final YouTubeVideoRepository youTubeVideoRepository;
    private final YouTubeVideoMapper youTubeVideoMapper;

    @Override
    public YouTubeVideoResponse create(YouTubeVideoRequest request) {

        log.info("Creating YouTube video with video ID: {}", request.getVideoId());

        if (youTubeVideoRepository.existsByVideoId(request.getVideoId())) {
            log.warn("Duplicate YouTube video ID detected: {}", request.getVideoId());
            throw new DuplicateResourceException("YouTubeVideo", "videoId", request.getVideoId());
        }

        YouTubeVideo video = youTubeVideoMapper.toEntity(request);
        video = youTubeVideoRepository.save(video);

        log.info("YouTube video created successfully with ID: {}", video.getId());

        return youTubeVideoMapper.toResponse(video);
    }

    @Override
    public YouTubeVideoResponse update(Long id, YouTubeVideoRequest request) {

        log.info("Updating YouTube video with ID: {}", id);

        YouTubeVideo video = findYouTubeVideoById(id);

        if (youTubeVideoRepository.findByVideoId(request.getVideoId())
                .filter(existingVideo -> !existingVideo.getId().equals(id))
                .isPresent()) {
            log.warn("Duplicate YouTube video ID detected: {}", request.getVideoId());
            throw new DuplicateResourceException("YouTubeVideo", "videoId", request.getVideoId());
        }

        youTubeVideoMapper.updateEntityFromRequest(request, video);
        video = youTubeVideoRepository.save(video);

        log.info("YouTube video updated successfully with ID: {}", video.getId());

        return youTubeVideoMapper.toResponse(video);
    }

    @Override
    @Transactional(readOnly = true)
    public YouTubeVideoResponse getById(Long id) {

        log.info("Fetching YouTube video with ID: {}", id);

        YouTubeVideo video = findYouTubeVideoById(id);

        log.info("YouTube video retrieved successfully with ID: {}", id);

        return youTubeVideoMapper.toResponse(video);
    }

    @Override
    @Transactional(readOnly = true)
    public List<YouTubeVideoResponse> getAll() {

        log.info("Fetching all YouTube videos.");

        List<YouTubeVideo> videos = youTubeVideoRepository.findAll(
                Sort.by(Sort.Direction.ASC, "displayOrder", "id")
        );

        log.info("Retrieved {} YouTube video(s) successfully.", videos.size());

        return videos.stream()
                .map(youTubeVideoMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<YouTubeVideoResponse> getPage(Pageable pageable) {

        log.info(
                "Fetching YouTube video page. page={}, size={}, sort={}",
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pageable.getSort()
        );

        return PageResponse.from(
                youTubeVideoRepository.findAll(pageable)
                        .map(youTubeVideoMapper::toResponse)
        );
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting YouTube video with ID: {}", id);

        YouTubeVideo video = findYouTubeVideoById(id);
        youTubeVideoRepository.delete(video);

        log.info("YouTube video deleted successfully with ID: {}", id);
    }

    private YouTubeVideo findYouTubeVideoById(Long id) {
        return youTubeVideoRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("YouTube video not found with ID: {}", id);
                    return new ResourceNotFoundException("YouTubeVideo", "id", id);
                });
    }
}
