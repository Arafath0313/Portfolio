package com.arafath.portfolio.mail.template;

import com.arafath.portfolio.entity.ContactMessage;

/**
 * Contract for building HTML email bodies.
 *
 * <p>Implementations are responsible only for producing well-formed HTML
 * strings. All sending logic stays in {@link com.arafath.portfolio.mail.service.EmailService}.
 * This separation keeps templates independently testable and replaceable
 * (e.g. Thymeleaf, Freemarker, or plain-string builders).</p>
 *
 * <p>Future email types (password-reset, verification, newsletter) should add
 * new methods here rather than polluting the sending layer.</p>
 */
public interface EmailTemplateService {

    /**
     * Builds the HTML body for the portfolio owner notification email.
     *
     * @param message the persisted contact message containing all visitor data
     * @return a complete, responsive HTML string ready to be used as a MIME body
     */
    String buildOwnerNotificationHtml(ContactMessage message);

    /**
     * Builds the HTML body for the visitor acknowledgment / auto-reply email.
     *
     * @param message the persisted contact message containing visitor data
     * @return a complete, responsive HTML string ready to be used as a MIME body
     */
    String buildVisitorAcknowledgmentHtml(ContactMessage message);
}
