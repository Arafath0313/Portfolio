package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Education;
import com.arafath.portfolio.entity.EducationGallery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EducationGalleryRepository extends JpaRepository<EducationGallery, Long> {
    @EntityGraph(attributePaths = {"education"})
    List<EducationGallery> findByEducationIdAndActiveTrueOrderByDisplayOrderAsc(Long educationId);
    
    @EntityGraph(attributePaths = {"education"})
    List<EducationGallery> findByActiveTrueOrderByDisplayOrderAsc();

    @EntityGraph(attributePaths = {"education"})
    Page<EducationGallery> findByEducation(Education education, Pageable pageable);
    
    @EntityGraph(attributePaths = {"education"})
    Page<EducationGallery> findByEducationId(Long educationId, Pageable pageable);

    @EntityGraph(attributePaths = {"education"})
    List<EducationGallery> findByEducation(Education education);

    long countByActiveTrue();
}