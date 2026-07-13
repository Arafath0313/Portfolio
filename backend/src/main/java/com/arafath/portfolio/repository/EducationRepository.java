package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Education;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findByActiveTrueOrderByDisplayOrderAsc();
    Page<Education> findByUniversityNameContainingIgnoreCase(String keyword, Pageable pageable);
    long countByActiveTrue();
}