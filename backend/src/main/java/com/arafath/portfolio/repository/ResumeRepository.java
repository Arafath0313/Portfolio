package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.About;
import com.arafath.portfolio.entity.Resume;
import com.arafath.portfolio.enums.FileType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    @EntityGraph(attributePaths = {"about"})
    Optional<Resume> findByAbout(About about);

    Optional<Resume> findByVersion(String version);

    @EntityGraph(attributePaths = {"about"})
    Optional<Resume> findByActiveTrue();

    List<Resume> findByFileType(FileType fileType);

    @EntityGraph(attributePaths = {"about"})
    List<Resume> findByActiveTrueOrderByCreatedAtDesc();

    boolean existsByAbout(About about);

    boolean existsByVersion(String version);

    long countByActiveTrue();

}