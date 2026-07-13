package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Project;
import com.arafath.portfolio.enums.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // ==========================================
    // Basic Queries
    // ==========================================

    Optional<Project> findBySlug(String slug);

    boolean existsBySlug(String slug);

    // ==========================================
    // Public Website
    // ==========================================

    Page<Project> findByActiveTrue(Pageable pageable);

    List<Project> findByActiveTrueOrderByDisplayOrderAsc();

    List<Project> findTop6ByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc();

    // ==========================================
    // Dashboard
    // ==========================================

    Page<Project> findByFeatured(Boolean featured, Pageable pageable);

    Page<Project> findByStatus(ProjectStatus status, Pageable pageable);

    Page<Project> findByActive(Boolean active, Pageable pageable);

    // ==========================================
    // Search
    // ==========================================

    Page<Project> findByTitleContainingIgnoreCase(
            String keyword,
            Pageable pageable);

    // ==========================================
    // Statistics
    // ==========================================

    long countByActiveTrue();

    long countByFeaturedTrue();

    long countByStatus(ProjectStatus status);

}