package com.arafath.portfolio.security.initializer;

import com.arafath.portfolio.entity.Admin;
import com.arafath.portfolio.enums.Role;
import com.arafath.portfolio.repository.AdminRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Initializes the default admin account when no admin users exist.
 */
@Slf4j
@Component
public class AdminInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final String defaultUsername;
    private final String defaultPassword;
    private final String defaultEmail;

    public AdminInitializer(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            @Value("${portfolio.admin.username}") String defaultUsername,
            @Value("${portfolio.admin.password}") String defaultPassword,
            @Value("${portfolio.admin.email}") String defaultEmail) {

        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.defaultUsername = defaultUsername;
        this.defaultPassword = defaultPassword;
        this.defaultEmail = defaultEmail;
    }

    /**
     * Creates the default admin account only when the admin table is empty.
     *
     * @param args application startup arguments
     */
    @Override
    public void run(String... args) {

        if (adminRepository.count() > 0) {
            log.info("Default admin initialization skipped because admin records already exist.");
            return;
        }

        validateDefaultAdminConfiguration();

        if (adminRepository.existsByUsername(defaultUsername) || adminRepository.existsByEmail(defaultEmail)) {
            log.info("Default admin initialization skipped because configured admin already exists.");
            return;
        }

        Admin admin = new Admin();
        admin.setUsername(defaultUsername);
        admin.setEmail(defaultEmail);
        admin.setPassword(passwordEncoder.encode(defaultPassword));
        admin.setRole(Role.ADMIN);
        admin.setEnabled(Boolean.TRUE);

        adminRepository.save(admin);

        log.info("Default admin account initialized for username: {}", defaultUsername);
    }

    private void validateDefaultAdminConfiguration() {

        if (!StringUtils.hasText(defaultUsername)
                || !StringUtils.hasText(defaultPassword)
                || !StringUtils.hasText(defaultEmail)) {
            throw new IllegalStateException(
                    "Default admin credentials must be configured when the admin table is empty."
            );
        }
    }
}