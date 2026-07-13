package com.arafath.portfolio.mail.exception;

/**
 * Thrown when an email cannot be delivered after all retry attempts are
 * exhausted, or when a permanent (non-retryable) sending failure occurs.
 *
 * <p>This is an unchecked exception. Callers must catch it explicitly if they
 * want to recover gracefully (e.g. log and continue) rather than propagating
 * it up the call stack.</p>
 */
public class EmailSendingException extends RuntimeException {

    public EmailSendingException(String message) {
        super(message);
    }

    public EmailSendingException(String message, Throwable cause) {
        super(message, cause);
    }
}
