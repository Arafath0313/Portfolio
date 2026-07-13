package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Skill;
import com.arafath.portfolio.enums.SkillCategory;
import com.arafath.portfolio.enums.SkillLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    // ==========================================
    // Public Website
    // ==========================================

    List<Skill> findByActiveTrueOrderByDisplayOrderAsc();

    List<Skill> findByCategoryAndActiveTrueOrderByDisplayOrderAsc(
            SkillCategory category);

    // ==========================================
    // Admin Dashboard
    // ==========================================

    Page<Skill> findByCategory(
            SkillCategory category,
            Pageable pageable);

    Page<Skill> findByLevel(
            SkillLevel level,
            Pageable pageable);

    Page<Skill> findByActive(
            Boolean active,
            Pageable pageable);

    // ==========================================
    // Search
    // ==========================================

    Page<Skill> findByNameContainingIgnoreCase(
            String keyword,
            Pageable pageable);

    // ==========================================
    // Validation
    // ==========================================

    boolean existsByNameIgnoreCase(String name);

    // ==========================================
    // Statistics
    // ==========================================

    long countByActiveTrue();

    long countByCategory(SkillCategory category);

    long countByLevel(SkillLevel level);

}