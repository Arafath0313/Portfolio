package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Passion;
import com.arafath.portfolio.entity.enums.ContentPlatform;
import com.arafath.portfolio.entity.enums.PassionCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PassionRepository extends JpaRepository<Passion, Long> {

    Page<Passion> findByActiveTrue(Pageable pageable);

    Page<Passion> findByFeaturedTrueAndActiveTrue(Pageable pageable);

    Page<Passion> findByFeaturedHomeTrueAndActiveTrue(Pageable pageable);

    Page<Passion> findByCategory(PassionCategory category, Pageable pageable);
    
    Page<Passion> findByCategoryAndActiveTrue(PassionCategory category, Pageable pageable);

    Page<Passion> findByContentPlatform(ContentPlatform contentPlatform, Pageable pageable);

    Page<Passion> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    long countByActiveTrue();

    long countByFeaturedTrue();

    long countByCategory(PassionCategory category);
}
