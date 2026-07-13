package com.arafath.portfolio.mail.template;

import com.arafath.portfolio.entity.ContactMessage;
import com.arafath.portfolio.mail.model.EmailConstants;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

/**
 * Builds responsive, inline-CSS HTML email bodies for the mail module.
 *
 * <p>Both templates are self-contained (no external CSS files or CDN links)
 * so they render correctly in all major email clients.</p>
 */
@Service
public class EmailTemplateServiceImpl implements EmailTemplateService {

    private static final DateTimeFormatter DISPLAY_FORMAT =
            DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm");

    // ── Owner notification ────────────────────────────────────────────────────

    /**
     * {@inheritDoc}
     *
     * <p>Renders a structured notification email with the visitor's details
     * laid out in a labeled card grid.</p>
     */
    @Override
    public String buildOwnerNotificationHtml(ContactMessage message) {

        String receivedAt = message.getReceivedAt() != null
                ? message.getReceivedAt().format(DISPLAY_FORMAT)
                : "—";

        String phone = (message.getPhone() != null && !message.getPhone().isBlank())
                ? escapeHtml(message.getPhone())
                : "Not provided";

        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8"/>
                  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
                  <title>New Contact Message</title>
                </head>
                <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
                  <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" border="0"
                         style="background-color:#f1f5f9;padding:40px 16px;">
                    <tr>
                      <td align="center">
                        <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" border="0"
                               style="max-width:600px;background:#ffffff;border-radius:16px;
                                      box-shadow:0 4px 24px rgba(15,23,42,.10);overflow:hidden;">

                          <!-- Header -->
                          <tr>
                            <td style="background:linear-gradient(135deg,#6366f1 0%%,#8b5cf6 100%%);
                                        padding:36px 40px;text-align:center;">
                              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;
                                          letter-spacing:-0.3px;">
                                📩 New Contact Message
                              </h1>
                              <p style="margin:8px 0 0;color:rgba(255,255,255,.80);font-size:14px;">
                                Someone reached out through your portfolio
                              </p>
                            </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                            <td style="padding:36px 40px;">

                              <!-- Field grid -->
                              <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" border="0">

                                %s

                              </table>

                              <!-- Message block -->
                              <div style="margin-top:24px;">
                                <p style="margin:0 0 8px;font-size:12px;font-weight:600;
                                            text-transform:uppercase;letter-spacing:.8px;
                                            color:#6366f1;">Message</p>
                                <div style="background:#f8fafc;border-left:4px solid #6366f1;
                                             border-radius:0 8px 8px 0;padding:16px 20px;
                                             color:#334155;font-size:15px;line-height:1.7;
                                             white-space:pre-wrap;">%s</div>
                              </div>

                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td style="background:#f8fafc;padding:20px 40px;text-align:center;
                                        border-top:1px solid #e2e8f0;">
                              <p style="margin:0;color:#94a3b8;font-size:12px;">
                                Received at %s &nbsp;·&nbsp; Portfolio Contact System
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(
                buildFieldRows(message, phone),
                escapeHtml(message.getMessage()),
                escapeHtml(receivedAt)
        );
    }

    // ── Visitor acknowledgment ────────────────────────────────────────────────

    /**
     * {@inheritDoc}
     *
     * <p>Renders a warm, personalised auto-reply that confirms receipt and
     * sets response-time expectations.</p>
     */
    @Override
    public String buildVisitorAcknowledgmentHtml(ContactMessage message) {

        String firstName = extractFirstName(message.getName());

        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8"/>
                  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
                  <title>Thank you for reaching out</title>
                </head>
                <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
                  <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" border="0"
                         style="background-color:#f1f5f9;padding:40px 16px;">
                    <tr>
                      <td align="center">
                        <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" border="0"
                               style="max-width:600px;background:#ffffff;border-radius:16px;
                                      box-shadow:0 4px 24px rgba(15,23,42,.10);overflow:hidden;">

                          <!-- Header -->
                          <tr>
                            <td style="background:linear-gradient(135deg,#6366f1 0%%,#8b5cf6 100%%);
                                        padding:36px 40px;text-align:center;">
                              <div style="display:inline-block;background:rgba(255,255,255,.15);
                                           border-radius:50%%;padding:12px;margin-bottom:12px;">
                                <span style="font-size:32px;">✉️</span>
                              </div>
                              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;
                                          letter-spacing:-0.3px;">
                                Message Received!
                              </h1>
                              <p style="margin:8px 0 0;color:rgba(255,255,255,.80);font-size:14px;">
                                Thank you for getting in touch
                              </p>
                            </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                            <td style="padding:40px;">

                              <p style="margin:0 0 20px;color:#334155;font-size:16px;line-height:1.6;">
                                Hi <strong>%s</strong>,
                              </p>

                              <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
                                Thank you for reaching out through my portfolio. I've successfully
                                received your message regarding <strong>"%s"</strong> and I appreciate
                                you taking the time to get in touch.
                              </p>

                              <!-- Confirmation card -->
                              <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;
                                           padding:20px 24px;margin:24px 0;">
                                <p style="margin:0 0 8px;color:#0369a1;font-size:13px;font-weight:600;
                                            text-transform:uppercase;letter-spacing:.6px;">
                                  ✅ Confirmation
                                </p>
                                <p style="margin:0;color:#0c4a6e;font-size:14px;line-height:1.6;">
                                  Your message has been safely stored and I will review it shortly.
                                  You can expect a response <strong>%s</strong>.
                                </p>
                              </div>

                              <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
                                In the meantime, feel free to explore more of my work on the portfolio.
                                If your inquiry is urgent, please mention it in a follow-up message.
                              </p>

                              <p style="margin:28px 0 0;color:#334155;font-size:15px;line-height:1.7;">
                                Warm regards,<br/>
                                <strong style="color:#6366f1;">%s</strong><br/>
                                <span style="color:#94a3b8;font-size:13px;">Portfolio Owner</span>
                              </p>

                            </td>
                          </tr>

                          <!-- Divider -->
                          <tr>
                            <td style="padding:0 40px;">
                              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0;"/>
                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td style="padding:20px 40px;text-align:center;">
                              <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                                This is an automated acknowledgment. Please do not reply to this email.<br/>
                                © %d Portfolio. All rights reserved.
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(
                escapeHtml(firstName),
                escapeHtml(message.getSubject()),
                EmailConstants.EXPECTED_REPLY_TIME,
                escapeHtml(EmailConstants.OWNER_SIGNATURE),
                java.time.Year.now().getValue()
        );
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /** Builds the labeled field rows for the owner notification email. */
    private String buildFieldRows(ContactMessage message, String phone) {
        return buildFieldRow("Name",    escapeHtml(message.getName()))    +
               buildFieldRow("Email",   escapeHtml(message.getEmail()))   +
               buildFieldRow("Phone",   phone)                            +
               buildFieldRow("Subject", escapeHtml(message.getSubject()));
    }

    /** Renders a single label-value row used in the owner notification. */
    private String buildFieldRow(String label, String value) {
        return """
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;
                              width:30%%;">
                    <span style="font-size:12px;font-weight:600;text-transform:uppercase;
                                  letter-spacing:.6px;color:#94a3b8;">%s</span>
                  </td>
                  <td style="padding:8px 0 8px 16px;border-bottom:1px solid #f1f5f9;
                              color:#1e293b;font-size:15px;">%s</td>
                </tr>
                """.formatted(label, value);
    }

    /** Extracts the first word of a full name for personalised greetings. */
    private String extractFirstName(String fullName) {
        if (fullName == null || fullName.isBlank()) return "there";
        String trimmed = fullName.trim();
        int space = trimmed.indexOf(' ');
        return space > 0 ? trimmed.substring(0, space) : trimmed;
    }

    /**
     * Minimal HTML escaping to prevent XSS in email bodies.
     * Email clients do not execute scripts, but this keeps the HTML valid.
     */
    private String escapeHtml(String input) {
        if (input == null) return "";
        return input
                .replace("&",  "&amp;")
                .replace("<",  "&lt;")
                .replace(">",  "&gt;")
                .replace("\"", "&quot;")
                .replace("'",  "&#x27;");
    }
}
