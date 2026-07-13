package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.request.AboutRequest;
import com.arafath.portfolio.dto.response.AboutResponse;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.AboutMapper;
import com.arafath.portfolio.repository.AboutRepository;
import com.arafath.portfolio.service.interfaces.AboutService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.arafath.portfolio.entity.About;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AboutServiceImpl implements AboutService {

    private final AboutRepository aboutRepository;
    private final AboutMapper aboutMapper;

    @Override
    public AboutResponse create(AboutRequest request) {

        log.info("Creating About information for email: {}", request.getEmail());

        if (aboutRepository.existsBy()) {

            log.warn("Attempted to create a second About record.");

            throw new DuplicateResourceException(
                    "Portfolio About information already exists."
            );
        }

        if (aboutRepository.existsByEmail(request.getEmail())) {

            log.warn("Duplicate email detected: {}", request.getEmail());

            throw new DuplicateResourceException(
                    "About",
                    "email",
                    request.getEmail()
            );
        }

        About about = aboutMapper.toEntity(request);

        about = aboutRepository.save(about);

        log.info("About information created successfully with ID: {}", about.getId());

        return aboutMapper.toResponse(about);
    }


    @Override
    public AboutResponse update(Long id, AboutRequest request) {

        log.info("Updating About information with ID: {}", id);

        // Check whether the About record exists
        About about = aboutRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("About information not found with ID: {}", id);
                    return new ResourceNotFoundException(
                            "About",
                            "id",
                            id
                    );
                });

        // Check duplicate email (excluding the current record)
        if (aboutRepository.existsByEmailAndIdNot(request.getEmail(), id)) {

            log.warn("Duplicate email detected: {}", request.getEmail());

            throw new DuplicateResourceException(
                    "About",
                    "email",
                    request.getEmail()
            );
        }

        // Update entity using MapStruct
        aboutMapper.updateEntityFromRequest(request, about);

        // Save updated entity
        about = aboutRepository.save(about);

        log.info("About information updated successfully with ID: {}", about.getId());

        return aboutMapper.toResponse(about);
    }


    @Override
    @Transactional(readOnly = true)
    public AboutResponse getById(Long id) {

        log.info("Fetching About information with ID: {}", id);

        About about = aboutRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("About information not found with ID: {}", id);
                    return new ResourceNotFoundException(
                            "About",
                            "id",
                            id
                    );
                });

        log.info("About information retrieved successfully with ID: {}", id);

        return aboutMapper.toResponse(about);
    }


    @Override
    @Transactional(readOnly = true)
    public AboutResponse get() {

        log.info("Fetching portfolio About information.");

        About about = aboutRepository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> {
                    log.warn("Portfolio About information not found.");
                    return new ResourceNotFoundException(
                            "Portfolio About information not found."
                    );
                });

        log.info("Portfolio About information retrieved successfully.");

        return aboutMapper.toResponse(about);
    }



    @Override
    public void delete(Long id) {

        log.info("Deleting About information with ID: {}", id);

        About about = aboutRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("About information not found with ID: {}", id);
                    return new ResourceNotFoundException(
                            "About",
                            "id",
                            id
                    );
                });

        aboutRepository.delete(about);

        log.info("About information deleted successfully with ID: {}", id);
    }
}
