package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Education;
import com.arafath.portfolio.entity.AcademicOrganization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AcademicOrganizationRepository extends JpaRepository<AcademicOrganization, Long> {
    @EntityGraph(attributePaths = {"education"})
    List<AcademicOrganization> findByEducationIdAndActiveTrueOrderByDisplayOrderAsc(Long educationId);
    
    @EntityGraph(attributePaths = {"education"})
    List<AcademicOrganization> findByActiveTrueOrderByDisplayOrderAsc();

    @EntityGraph(attributePaths = {"education"})
    Page<AcademicOrganization> findByEducation(Education education, Pageable pageable);
    
    @EntityGraph(attributePaths = {"education"})
    Page<AcademicOrganization> findByEducationId(Long educationId, Pageable pageable);

    @EntityGraph(attributePaths = {"education"})
    List<AcademicOrganization> findByEducation(Education education);

    long countByActiveTrue();
}