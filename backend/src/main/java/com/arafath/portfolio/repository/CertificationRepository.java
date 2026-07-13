package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.Certification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {

    // =========================
    // Basic Queries
    // =========================

    Optional<Certification> findByCredentialId(String credentialId);

    boolean existsByCredentialId(String credentialId);

    // =========================
    // Public Website
    // =========================

    List<Certification> findByActiveTrueOrderByDisplayOrderAsc();

    // =========================
    // Search
    // =========================

    Page<Certification> findByTitleContainingIgnoreCase(
            String keyword,
            Pageable pageable);

    Page<Certification> findByIssuerContainingIgnoreCase(
            String issuer,
            Pageable pageable);

    // =========================
    // Date Filters
    // =========================

    Page<Certification> findByIssueDate(
            LocalDate issueDate,
            Pageable pageable);

    // =========================
    // Admin Dashboard
    // =========================

    Page<Certification> findByActive(
            Boolean active,
            Pageable pageable);

    // =========================
    // Statistics
    // =========================

    long countByActiveTrue();

}