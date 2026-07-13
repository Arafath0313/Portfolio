package com.arafath.portfolio.mail.model;

/**
 * Centralised constants for the mail module.
 *
 * <p>Keeping magic values here makes them easy to tune without touching
 * business logic and prepares the module for future email types
 * (password-reset, newsletter, verification, etc.).</p>
 */
public final class EmailConstants {

    // ── Retry ────────────────────────────────────────────────────────────────

    /** Maximum number of send attempts before giving up. */
    public static final int MAX_RETRY_ATTEMPTS = 3;

    /** Initial back-off delay in milliseconds (doubles on each attempt). */
    public static final long INITIAL_BACKOFF_MS = 1_000L;

    /** Multiplier applied to the backoff delay after each failed attempt. */
    public static final double BACKOFF_MULTIPLIER = 2.0;

    // ── Template copy ────────────────────────────────────────────────────────

    /** Expected response time communicated to visitors. */
    public static final String EXPECTED_REPLY_TIME = "within 24–48 hours";

    /** Name shown in outbound emails as the portfolio owner's signature. */
    public static final String OWNER_SIGNATURE = "Portfolio Owner";

    // ── Subject prefixes ─────────────────────────────────────────────────────

    /** Subject prefix used for owner notification emails. */
    public static final String OWNER_SUBJECT_PREFIX = "[Portfolio Contact] ";

    // ── Charset ──────────────────────────────────────────────────────────────

    /** UTF-8 charset used for all outbound MIME email bodies. */
    public static final String CHARSET_UTF8 = "UTF-8";

    private EmailConstants() {
        // utility class — not instantiable
    }
}

