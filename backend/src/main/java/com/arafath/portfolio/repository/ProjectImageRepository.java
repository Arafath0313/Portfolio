package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Project;
import com.arafath.portfolio.entity.ProjectImage;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {

    // ==========================================
    // Project Images
    // ==========================================

    List<ProjectImage> findByProject(Project project);

    @EntityGraph(attributePaths = {"project"})
    List<ProjectImage> findByProjectIdOrderByDisplayOrderAscIdAsc(Long projectId);

    List<ProjectImage> findByProjectAndActiveTrueOrderByDisplayOrderAsc(Project project);

    // ==========================================
    // Active Images
    // ==========================================

    List<ProjectImage> findByActiveTrueOrderByDisplayOrderAsc();

    // ==========================================
    // Dashboard
    // ==========================================

    long countByProject(Project project);

    long countByActiveTrue();

    // ==========================================
    // Delete Operations
    // ==========================================

    void deleteByProject(Project project);
}
