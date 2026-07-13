package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.AdminRequest;
import com.arafath.portfolio.dto.response.AdminResponse;
import com.arafath.portfolio.entity.Admin;
import com.arafath.portfolio.exception.DuplicateResourceException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mapper.AdminMapper;
import com.arafath.portfolio.repository.AdminRepository;
import com.arafath.portfolio.service.interfaces.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AdminResponse create(AdminRequest request) {

        log.info("Creating admin account for username: {}", request.getUsername());

        if (adminRepository.existsByUsername(request.getUsername())) {
            log.warn("Duplicate username detected: {}", request.getUsername());
            throw new DuplicateResourceException("Admin", "username", request.getUsername());
        }

        if (adminRepository.existsByEmail(request.getEmail())) {
            log.warn("Duplicate email detected: {}", request.getEmail());
            throw new DuplicateResourceException("Admin", "email", request.getEmail());
        }

        Admin admin = adminMapper.toEntity(request);
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin = adminRepository.save(admin);

        log.info("Admin account created successfully with ID: {}", admin.getId());

        return adminMapper.toResponse(admin);
    }

    @Override
    public AdminResponse update(Long id, AdminRequest request) {

        log.info("Updating admin account with ID: {}", id);

        Admin admin = findAdminById(id);

        if (adminRepository.findByUsername(request.getUsername())
                .filter(existingAdmin -> !existingAdmin.getId().equals(id))
                .isPresent()) {
            log.warn("Duplicate username detected: {}", request.getUsername());
            throw new DuplicateResourceException("Admin", "username", request.getUsername());
        }

        if (adminRepository.findByEmail(request.getEmail())
                .filter(existingAdmin -> !existingAdmin.getId().equals(id))
                .isPresent()) {
            log.warn("Duplicate email detected: {}", request.getEmail());
            throw new DuplicateResourceException("Admin", "email", request.getEmail());
        }

        adminMapper.updateEntityFromRequest(request, admin);
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin = adminRepository.save(admin);

        log.info("Admin account updated successfully with ID: {}", admin.getId());

        return adminMapper.toResponse(admin);
    }

    @Override
    @Transactional(readOnly = true)
    public AdminResponse getById(Long id) {

        log.info("Fetching admin account with ID: {}", id);

        Admin admin = findAdminById(id);

        log.info("Admin account retrieved successfully with ID: {}", id);

        return adminMapper.toResponse(admin);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminResponse> getAll() {

        log.info("Fetching all admin accounts.");

        List<Admin> admins = adminRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));

        log.info("Retrieved {} admin account(s) successfully.", admins.size());

        return admins.stream()
                .map(adminMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<AdminResponse> getPage(Pageable pageable) {

        log.info(
                "Fetching admin page. page={}, size={}, sort={}",
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pageable.getSort()
        );

        return PageResponse.from(
                adminRepository.findAll(pageable)
                        .map(adminMapper::toResponse)
        );
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting admin account with ID: {}", id);

        Admin admin = findAdminById(id);
        adminRepository.delete(admin);

        log.info("Admin account deleted successfully with ID: {}", id);
    }

    private Admin findAdminById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Admin account not found with ID: {}", id);
                    return new ResourceNotFoundException("Admin", "id", id);
                });
    }
}
