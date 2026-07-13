package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.SocialLink;
import com.arafath.portfolio.enums.SocialPlatform;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {

    // ==========================================
    // Basic Queries
    // ==========================================

    Optional<SocialLink> findByPlatform(SocialPlatform platform);

    boolean existsByPlatform(SocialPlatform platform);

    // ==========================================
    // Public Website
    // ==========================================

    List<SocialLink> findByActiveTrueOrderByDisplayOrderAsc();

    // ==========================================
    // Admin Dashboard
    // ==========================================

    Page<SocialLink> findByActive(
            Boolean active,
            Pageable pageable);

    Page<SocialLink> findByPlatform(
            SocialPlatform platform,
            Pageable pageable);

    // ==========================================
    // Statistics
    // ==========================================

    long countByActiveTrue();

}