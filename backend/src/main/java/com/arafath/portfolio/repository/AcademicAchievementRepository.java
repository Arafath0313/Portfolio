package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Education;
import com.arafath.portfolio.entity.AcademicAchievement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AcademicAchievementRepository extends JpaRepository<AcademicAchievement, Long> {
    @EntityGraph(attributePaths = {"education"})
    List<AcademicAchievement> findByEducationIdAndActiveTrueOrderByDisplayOrderAsc(Long educationId);
    
    @EntityGraph(attributePaths = {"education"})
    List<AcademicAchievement> findByActiveTrueOrderByDisplayOrderAsc();

    @EntityGraph(attributePaths = {"education"})
    Page<AcademicAchievement> findByEducation(Education education, Pageable pageable);
    
    @EntityGraph(attributePaths = {"education"})
    Page<AcademicAchievement> findByEducationId(Long educationId, Pageable pageable);

    @EntityGraph(attributePaths = {"education"})
    List<AcademicAchievement> findByEducation(Education education);

    long countByActiveTrue();
}