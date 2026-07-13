package com.arafath.portfolio.repository;

import com.arafath.portfolio.entity.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AboutRepository extends JpaRepository<About, Long> {

    /**
     * Returns the portfolio About information.
     */
    Optional<About> findFirstByOrderByIdAsc();

    /**
     * Checks whether any About record exists.
     */
    boolean existsBy();

    /**
     * Checks whether the email already exists.
     */
    boolean existsByEmail(String email);

    /**
     * Checks whether the email already exists
     * excluding the current About record.
     */
    boolean existsByEmailAndIdNot(String email, Long id);

    /**
     * Finds About information by email.
     */
    Optional<About> findByEmail(String email);

}