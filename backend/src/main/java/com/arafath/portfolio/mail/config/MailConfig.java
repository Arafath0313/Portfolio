package com.arafath.portfolio.mail.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

/**
 * Mail module configuration.
 *
 * <p>Performs a fail-fast validation of required custom SMTP properties at
 * application startup. Spring Boot's {@code JavaMailSender} auto-configuration
 * is reused — no custom bean is created here.</p>
 *
 * <p>If {@code MAIL_FROM} or {@code MAIL_OWNER} are blank the application will
 * refuse to start and print a clear error message in the log.</p>
 */
@Slf4j
@Configuration
@RequiredArgsConstructor
public class MailConfig {

    private final MailProperties mailProperties;

    /**
     * Validates required SMTP properties on startup.
     *
     * <p>Throws {@link IllegalStateException} if either the sender address
     * ({@code mail.from}) or the owner notification address
     * ({@code mail.owner}) is absent, preventing the application from starting
     * in a misconfigured state.</p>
     */
    @PostConstruct
    public void validateMailConfiguration() {

        log.info("Validating SMTP mail configuration...");

        if (!StringUtils.hasText(mailProperties.getFrom())) {
            throw new IllegalStateException(
                    "SMTP configuration error: 'mail.from' (MAIL_FROM) is required but is not set. " +
                    "Please configure the MAIL_FROM environment variable."
            );
        }

        if (!StringUtils.hasText(mailProperties.getOwner())) {
            throw new IllegalStateException(
                    "SMTP configuration error: 'mail.owner' (MAIL_OWNER) is required but is not set. " +
                    "Please configure the MAIL_OWNER environment variable."
            );
        }

        log.info("SMTP mail configuration validated successfully. " +
                 "Sender: [{}], Owner notifications: [{}]",
                 mailProperties.getFrom(),
                 mailProperties.getOwner());
    }
}
