package com.arafath.portfolio.mail.service;

import com.arafath.portfolio.entity.ContactMessage;
import com.arafath.portfolio.mail.config.MailProperties;
import com.arafath.portfolio.mail.exception.EmailSendingException;
import com.arafath.portfolio.mail.model.EmailConstants;
import com.arafath.portfolio.mail.template.EmailTemplateService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.MailParseException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

/**
 * Default implementation of {@link EmailService}.
 *
 * <p><strong>Retry strategy:</strong> both send methods are annotated with
 * {@code @Retryable} to handle transient SMTP failures (connection timeouts,
 * temporary server unavailability). Up to {@value EmailConstants#MAX_RETRY_ATTEMPTS}
 * attempts are made with exponential back-off starting at
 * {@value EmailConstants#INITIAL_BACKOFF_MS} ms.</p>
 *
 * <p><strong>Permanent failures</strong> ({@link MailParseException} — invalid
 * addresses or malformed content) are excluded from retry via {@code noRetryFor}
 * and are immediately caught and wrapped in {@link EmailSendingException}.</p>
 *
 * <p><strong>Recovery:</strong> after exhausting all retry attempts the
 * {@code @Recover} methods log the failure at ERROR level and throw
 * {@link EmailSendingException}. Each {@code @Retryable} method is bound to its
 * specific recovery method via the {@code recover} attribute to avoid
 * ambiguity when both methods share the same signature.</p>
 *
 * <p><strong>Isolation guarantee:</strong> callers in {@code ContactMessageServiceImpl}
 * catch {@link EmailSendingException} independently for each send operation so
 * a failure in owner notification never prevents visitor acknowledgment, and
 * neither can roll back the saved contact message.</p>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final EmailTemplateService emailTemplateService;
    private final MailProperties mailProperties;

    // ── Owner notification ────────────────────────────────────────────────────

    /**
     * {@inheritDoc}
     *
     * <p>Retries on transient {@link MailSendException} and {@link MailException}
     * with exponential back-off. Does not retry {@link MailParseException}
     * (permanent failure — invalid address or malformed content).
     * Bound to {@link #recoverOwnerNotification} via the {@code recover} attribute.</p>
     */
    @Override
    @Retryable(
            retryFor    = {MailSendException.class, MailException.class},
            noRetryFor  = {MailParseException.class},
            maxAttempts = EmailConstants.MAX_RETRY_ATTEMPTS,
            backoff     = @Backoff(
                    delay      = EmailConstants.INITIAL_BACKOFF_MS,
                    multiplier = EmailConstants.BACKOFF_MULTIPLIER
            ),
            recover     = "recoverOwnerNotification"
    )
    public void sendOwnerNotification(ContactMessage message) {

        log.info("Sending owner notification email for contact message ID: {}", message.getId());

        try {
            String subject = EmailConstants.OWNER_SUBJECT_PREFIX + message.getSubject();
            String htmlBody = emailTemplateService.buildOwnerNotificationHtml(message);

            sendHtmlEmail(
                    mailProperties.getFrom(),
                    mailProperties.getOwner(),
                    subject,
                    htmlBody
            );

            log.info("Owner notification email sent successfully for contact message ID: {}",
                     message.getId());

        } catch (MailParseException ex) {
            log.error("Permanent email failure (invalid address/content) for owner notification. " +
                      "Contact message ID: {}. Error: {}", message.getId(), ex.getMessage());
            throw new EmailSendingException(
                    "Failed to send owner notification — permanent email error.", ex);

        } catch (MessagingException ex) {
            log.error("MIME message construction failed for owner notification. " +
                      "Contact message ID: {}. Error: {}", message.getId(), ex.getMessage());
            throw new EmailSendingException(
                    "Failed to build owner notification email.", ex);
        }
    }

    // ── Visitor acknowledgment ────────────────────────────────────────────────

    /**
     * {@inheritDoc}
     *
     * <p>Same retry policy as {@link #sendOwnerNotification}.
     * Bound to {@link #recoverVisitorAcknowledgment} via the {@code recover} attribute.</p>
     */
    @Override
    @Retryable(
            retryFor    = {MailSendException.class, MailException.class},
            noRetryFor  = {MailParseException.class},
            maxAttempts = EmailConstants.MAX_RETRY_ATTEMPTS,
            backoff     = @Backoff(
                    delay      = EmailConstants.INITIAL_BACKOFF_MS,
                    multiplier = EmailConstants.BACKOFF_MULTIPLIER
            ),
            recover     = "recoverVisitorAcknowledgment"
    )
    public void sendVisitorAcknowledgment(ContactMessage message) {

        log.info("Sending visitor acknowledgment email. Contact message ID: {}, Recipient: {}",
                 message.getId(), message.getEmail());

        try {
            String subject = "Thank you for your message — " + message.getSubject();
            String htmlBody = emailTemplateService.buildVisitorAcknowledgmentHtml(message);

            sendHtmlEmail(
                    mailProperties.getFrom(),
                    message.getEmail(),
                    subject,
                    htmlBody
            );

            log.info("Visitor acknowledgment email sent successfully. " +
                     "Contact message ID: {}, Recipient: {}",
                     message.getId(), message.getEmail());

        } catch (MailParseException ex) {
            log.error("Permanent email failure (invalid visitor address). " +
                      "Contact message ID: {}, Recipient: {}. Error: {}",
                      message.getId(), message.getEmail(), ex.getMessage());
            throw new EmailSendingException(
                    "Failed to send visitor acknowledgment — permanent email error.", ex);

        } catch (MessagingException ex) {
            log.error("MIME message construction failed for visitor acknowledgment. " +
                      "Contact message ID: {}. Error: {}", message.getId(), ex.getMessage());
            throw new EmailSendingException(
                    "Failed to build visitor acknowledgment email.", ex);
        }
    }

    // ── Recovery handlers ─────────────────────────────────────────────────────

    /**
     * Recovery handler invoked when all retry attempts for
     * {@link #sendOwnerNotification} are exhausted.
     *
     * <p>Logs at ERROR with full context and throws {@link EmailSendingException}
     * so the caller can handle gracefully without re-exposing the SMTP root cause.</p>
     *
     * @param ex      the final {@link MailException} that triggered recovery
     * @param message the contact message for which notification failed
     */
    @Recover
    public void recoverOwnerNotification(MailException ex, ContactMessage message) {
        log.error("All {} retry attempts exhausted for owner notification. " +
                  "Contact message ID: {}. Final error: {}",
                  EmailConstants.MAX_RETRY_ATTEMPTS, message.getId(), ex.getMessage());
        throw new EmailSendingException(
                "Owner notification failed after " + EmailConstants.MAX_RETRY_ATTEMPTS + " attempts.", ex);
    }

    /**
     * Recovery handler invoked when all retry attempts for
     * {@link #sendVisitorAcknowledgment} are exhausted.
     *
     * @param ex      the final {@link MailException} that triggered recovery
     * @param message the contact message for which acknowledgment failed
     */
    @Recover
    public void recoverVisitorAcknowledgment(MailException ex, ContactMessage message) {
        log.error("All {} retry attempts exhausted for visitor acknowledgment. " +
                  "Contact message ID: {}, Recipient: {}. Final error: {}",
                  EmailConstants.MAX_RETRY_ATTEMPTS, message.getId(),
                  message.getEmail(), ex.getMessage());
        throw new EmailSendingException(
                "Visitor acknowledgment failed after " + EmailConstants.MAX_RETRY_ATTEMPTS + " attempts.", ex);
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /**
     * Builds and sends a UTF-8 HTML MIME email.
     *
     * @param from    sender address
     * @param to      recipient address
     * @param subject email subject line
     * @param html    complete HTML body
     * @throws MessagingException if the MimeMessage cannot be constructed
     * @throws MailException      if {@link JavaMailSender} fails to deliver
     */
    private void sendHtmlEmail(String from, String to, String subject, String html)
            throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage, false, EmailConstants.CHARSET_UTF8);

        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(html, true);   // isHtml = true

        mailSender.send(mimeMessage);
    }
}
