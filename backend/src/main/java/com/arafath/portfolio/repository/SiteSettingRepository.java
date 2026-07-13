package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.SiteSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SiteSettingRepository extends JpaRepository<SiteSetting, Long> {

    // ==========================================
    // Public Website
    // ==========================================

    Optional<SiteSetting> findByActiveTrue();

    // ==========================================
    // Validation
    // ==========================================

    boolean existsByContactEmail(String contactEmail);

    // ==========================================
    // Statistics
    // ==========================================

    long countByActiveTrue();

}