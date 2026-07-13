package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.ContactMessage;
import com.arafath.portfolio.enums.MessageStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    // =========================
    // Admin Dashboard
    // =========================

    Page<ContactMessage> findByStatus(
            MessageStatus status,
            Pageable pageable);

    Page<ContactMessage> findByReplied(
            Boolean replied,
            Pageable pageable);

    // =========================
    // Search
    // =========================

    Page<ContactMessage> findByNameContainingIgnoreCase(
            String keyword,
            Pageable pageable);

    Page<ContactMessage> findByEmailContainingIgnoreCase(
            String keyword,
            Pageable pageable);

    Page<ContactMessage> findBySubjectContainingIgnoreCase(
            String keyword,
            Pageable pageable);

    // =========================
    // Date Filter
    // =========================

    Page<ContactMessage> findByReceivedAtAfter(
            LocalDateTime dateTime,
            Pageable pageable);

    // =========================
    // Recent Messages
    // =========================

    List<ContactMessage> findTop10ByOrderByReceivedAtDesc();

    // =========================
    // Dashboard Statistics
    // =========================

    long countByStatus(MessageStatus status);

    long countByRepliedTrue();

    long countByRepliedFalse();

}