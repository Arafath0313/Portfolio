package com.arafath.portfolio.mail.config;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/**
 * Custom mail properties loaded from {@code application.yml} under the
 * {@code mail} prefix.
 *
 * <p>These complement Spring's built-in {@code spring.mail.*} properties and
 * carry portfolio-specific configuration such as the sender address and the
 * portfolio owner's email inbox.</p>
 *
 * <p>{@code @Validated} causes Spring to apply JSR-303 bean-validation
 * constraints at bind-time, failing fast if a required value is absent before
 * {@link MailConfig}'s {@code @PostConstruct} even runs.</p>
 *
 * <pre>
 * mail:
 *   from:  ${MAIL_FROM}
 *   owner: ${MAIL_OWNER}
 * </pre>
 */
@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "mail")
public class MailProperties {

    /**
     * The "From" address shown in outbound emails.
     * Must be a verified sender address on the configured SMTP provider.
     */
    @NotBlank(message = "mail.from (MAIL_FROM) must not be blank.")
    private String from;

    /**
     * The portfolio owner's email address that receives contact notifications.
     */
    @NotBlank(message = "mail.owner (MAIL_OWNER) must not be blank.")
    private String owner;
}
