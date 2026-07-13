package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.YouTubeVideo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface YouTubeVideoRepository extends JpaRepository<YouTubeVideo, Long> {

    // ==========================================
    // Basic Queries
    // ==========================================

    Optional<YouTubeVideo> findByVideoId(String videoId);

    boolean existsByVideoId(String videoId);

    // ==========================================
    // Public Website
    // ==========================================

    List<YouTubeVideo> findByActiveTrueOrderByDisplayOrderAsc();

    List<YouTubeVideo> findTop6ByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc();

    // ==========================================
    // Admin Dashboard
    // ==========================================

    Page<YouTubeVideo> findByActive(Boolean active, Pageable pageable);

    Page<YouTubeVideo> findByFeatured(Boolean featured, Pageable pageable);

    // ==========================================
    // Search
    // ==========================================

    Page<YouTubeVideo> findByTitleContainingIgnoreCase(
            String keyword,
            Pageable pageable);

    // ==========================================
    // Date Filter
    // ==========================================

    Page<YouTubeVideo> findByPublishedAt(
            LocalDate publishedAt,
            Pageable pageable);

    // ==========================================
    // Statistics
    // ==========================================

    long countByActiveTrue();

    long countByFeaturedTrue();

}