package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Admin;
import com.arafath.portfolio.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Authentication
    Optional<Admin> findByUsername(String username);

    Optional<Admin> findByEmail(String email);

    // Validation
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    // Dashboard
    Page<Admin> findByEnabled(Boolean enabled, Pageable pageable);

    Page<Admin> findByRole(Role role, Pageable pageable);

    Page<Admin> findByUsernameContainingIgnoreCase(String username, Pageable pageable);

    // Statistics
    long countByEnabledTrue();

}