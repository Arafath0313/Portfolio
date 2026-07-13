package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.SocialLinkRequest;
import com.arafath.portfolio.dto.response.SocialLinkResponse;
import com.arafath.portfolio.entity.SocialLink;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.SocialLinkMapper;
import com.arafath.portfolio.repository.SocialLinkRepository;
import com.arafath.portfolio.service.interfaces.SocialLinkService;
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
public class SocialLinkServiceImpl implements SocialLinkService {

    private final SocialLinkRepository socialLinkRepository;
    private final SocialLinkMapper socialLinkMapper;

    @Override
    public SocialLinkResponse create(SocialLinkRequest request) {

        log.info("Creating social link for platform: {}", request.getPlatform());

        if (socialLinkRepository.existsByPlatform(request.getPlatform())) {
            log.warn("Duplicate social platform detected: {}", request.getPlatform());
            throw new DuplicateResourceException("SocialLink", "platform", request.getPlatform());
        }

        SocialLink socialLink = socialLinkMapper.toEntity(request);
        socialLink = socialLinkRepository.save(socialLink);

        log.info("Social link created successfully with ID: {}", socialLink.getId());

        return socialLinkMapper.toResponse(socialLink);
    }

    @Override
    public SocialLinkResponse update(Long id, SocialLinkRequest request) {

        log.info("Updating social link with ID: {}", id);

        SocialLink socialLink = findSocialLinkById(id);

        if (socialLink.getPlatform() != request.getPlatform()
                && socialLinkRepository.existsByPlatform(request.getPlatform())) {
            log.warn("Duplicate social platform detected: {}", request.getPlatform());
            throw new DuplicateResourceException("SocialLink", "platform", request.getPlatform());
        }

        socialLinkMapper.updateEntityFromRequest(request, socialLink);
        socialLink = socialLinkRepository.save(socialLink);

        log.info("Social link updated successfully with ID: {}", socialLink.getId());

        return socialLinkMapper.toResponse(socialLink);
    }

    @Override
    @Transactional(readOnly = true)
    public SocialLinkResponse getById(Long id) {

        log.info("Fetching social link with ID: {}", id);

        SocialLink socialLink = findSocialLinkById(id);

        log.info("Social link retrieved successfully with ID: {}", id);

        return socialLinkMapper.toResponse(socialLink);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SocialLinkResponse> getAll() {

        log.info("Fetching all social links.");

        List<SocialLink> socialLinks = socialLinkRepository.findAll(
                Sort.by(Sort.Direction.ASC, "displayOrder", "id")
        );

        log.info("Retrieved {} social link(s) successfully.", socialLinks.size());

        return socialLinks.stream()
                .map(socialLinkMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<SocialLinkResponse> getPage(Pageable pageable) {

        log.info(
                "Fetching social link page. page={}, size={}, sort={}",
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pageable.getSort()
        );

        return PageResponse.from(
                socialLinkRepository.findAll(pageable)
                        .map(socialLinkMapper::toResponse)
        );
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting social link with ID: {}", id);

        SocialLink socialLink = findSocialLinkById(id);
        socialLinkRepository.delete(socialLink);

        log.info("Social link deleted successfully with ID: {}", id);
    }

    private SocialLink findSocialLinkById(Long id) {
        return socialLinkRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Social link not found with ID: {}", id);
                    return new ResourceNotFoundException("SocialLink", "id", id);
                });
    }
}
