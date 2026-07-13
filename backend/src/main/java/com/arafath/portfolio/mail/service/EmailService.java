package com.arafath.portfolio.mail.service;

import com.arafath.portfolio.entity.ContactMessage;

/**
 * Contract for the email dispatch layer.
 *
 * <p>All methods accept the <strong>persisted</strong> {@link ContactMessage}
 * entity rather than the raw request DTO. This ensures that emails always
 * reflect exactly what was committed to the database, including the generated
 * ID, {@code receivedAt} timestamp, and default status fields.</p>
 *
 * <p>Implementations must guarantee that email failures are logged but never
 * propagated in a way that rolls back the calling transaction.</p>
 *
 * <p>This interface is intentionally broad so future features
 * (password-reset, newsletter, verification) can add methods here.</p>
 */
public interface EmailService {

    /**
     * Sends a notification email to the portfolio owner informing them
     * that a new contact message has been submitted.
     *
     * @param message the saved contact message
     */
    void sendOwnerNotification(ContactMessage message);

    /**
     * Sends an automatic acknowledgment email to the visitor confirming
     * that their message was received.
     *
     * @param message the saved contact message
     */
    void sendVisitorAcknowledgment(ContactMessage message);
}
