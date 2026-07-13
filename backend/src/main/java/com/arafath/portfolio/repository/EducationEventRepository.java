package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Education;
import com.arafath.portfolio.entity.EducationEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EducationEventRepository extends JpaRepository<EducationEvent, Long> {
    @EntityGraph(attributePaths = {"education"})
    List<EducationEvent> findByEducationIdAndActiveTrueOrderByDisplayOrderAsc(Long educationId);
    
    @EntityGraph(attributePaths = {"education"})
    List<EducationEvent> findByActiveTrueOrderByDisplayOrderAsc();

    @EntityGraph(attributePaths = {"education"})
    Page<EducationEvent> findByEducation(Education education, Pageable pageable);
    
    @EntityGraph(attributePaths = {"education"})
    Page<EducationEvent> findByEducationId(Long educationId, Pageable pageable);

    @EntityGraph(attributePaths = {"education"})
    List<EducationEvent> findByEducation(Education education);

    long countByActiveTrue();
}