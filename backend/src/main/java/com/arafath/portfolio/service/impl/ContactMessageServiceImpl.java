package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.ContactMessagePatchRequest;
import com.arafath.portfolio.dto.request.ContactMessageRequest;
import com.arafath.portfolio.dto.response.ContactMessageResponse;
import com.arafath.portfolio.entity.ContactMessage;
import com.arafath.portfolio.enums.MessageStatus;
import com.arafath.portfolio.exception.BadRequestException;
import com.arafath.portfolio.exception.ResourceNotFoundException;
import com.arafath.portfolio.mail.exception.EmailSendingException;
import com.arafath.portfolio.mail.service.EmailService;
import com.arafath.portfolio.mapper.ContactMessageMapper;
import com.arafath.portfolio.repository.ContactMessageRepository;
import com.arafath.portfolio.service.interfaces.ContactMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.StringUtils;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactMessageMapper contactMessageMapper;
    private final EmailService emailService;

    /**
     * Saves a new contact message and schedules email dispatch to run
     * <strong>after the transaction has committed</strong>.
     *
     * <p>Workflow:</p>
     * <ol>
     *   <li>Map request DTO → entity and persist.</li>
     *   <li>Register an {@code afterCommit} synchronization so emails are
     *       only sent once the DB record is durably stored.</li>
     *   <li>Inside {@code afterCommit}: send owner notification, then send
     *       visitor acknowledgment, catching {@link EmailSendingException}
     *       on each so neither email failure can affect the saved record.</li>
     *   <li>Return the mapped response — the caller always gets a 201.</li>
     * </ol>
     */
    @Override
    public ContactMessageResponse create(ContactMessageRequest request) {

        log.info("Contact received from: {} <{}>", request.getName(), request.getEmail());

        ContactMessage contactMessage = contactMessageMapper.toEntity(request);
        contactMessage.setStatus(MessageStatus.NEW);
        contactMessage.setReplied(Boolean.FALSE);
        contactMessage = contactMessageRepository.save(contactMessage);

        log.info("Contact message saved successfully. ID: {}, Subject: \"{}\"",
                 contactMessage.getId(), contactMessage.getSubject());

        // Capture a final reference for use inside the lambda
        final ContactMessage savedMessage = contactMessage;

        // Register post-commit hook only when a transaction is active.
        // afterCommit() fires ONLY after the DB record is durably committed.
        // Fallback: dispatch immediately if called outside a managed transaction
        // (e.g. integration tests or CLI contexts), with a warning.
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(
                    new TransactionSynchronization() {
                        @Override
                        public void afterCommit() {
                            dispatchEmails(savedMessage);
                        }
                    }
            );
        } else {
            log.warn("No active transaction synchronization found for contact message ID: {}. " +
                     "Dispatching emails immediately as fallback.", savedMessage.getId());
            dispatchEmails(savedMessage);
        }

        return contactMessageMapper.toResponse(contactMessage);
    }

    @Override
    public ContactMessageResponse update(Long id, ContactMessageRequest request) {

        log.info("Updating contact message with ID: {}", id);

        ContactMessage contactMessage = findContactMessageById(id);
        contactMessageMapper.updateEntityFromRequest(request, contactMessage);
        contactMessage = contactMessageRepository.save(contactMessage);

        log.info("Contact message updated successfully with ID: {}", contactMessage.getId());

        return contactMessageMapper.toResponse(contactMessage);
    }

    @Override
    public ContactMessageResponse patch(Long id, ContactMessagePatchRequest request) {

        log.info("Patching contact message with ID: {}", id);

        ContactMessage contactMessage = findContactMessageById(id);

        if (StringUtils.hasText(request.getStatus())) {
            try {
                contactMessage.setStatus(MessageStatus.valueOf(request.getStatus().trim()));
            } catch (IllegalArgumentException ex) {
                throw new BadRequestException("Status must be one of: NEW, READ, REPLIED.");
            }
        }

        if (request.getReplied() != null) {
            contactMessage.setReplied(request.getReplied());
        }

        contactMessage = contactMessageRepository.save(contactMessage);

        log.info("Contact message patched successfully with ID: {}", contactMessage.getId());

        return contactMessageMapper.toResponse(contactMessage);
    }

    @Override
    @Transactional(readOnly = true)
    public ContactMessageResponse getById(Long id) {

        log.info("Fetching contact message with ID: {}", id);

        ContactMessage contactMessage = findContactMessageById(id);

        log.info("Contact message retrieved successfully with ID: {}", id);

        return contactMessageMapper.toResponse(contactMessage);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContactMessageResponse> getAll() {

        log.info("Fetching all contact messages.");

        List<ContactMessage> contactMessages = contactMessageRepository.findAll(
                Sort.by(Sort.Order.desc("receivedAt"), Sort.Order.desc("id"))
        );

        log.info("Retrieved {} contact message(s) successfully.", contactMessages.size());

        return contactMessages.stream()
                .map(contactMessageMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ContactMessageResponse> getPage(Pageable pageable) {

        log.info(
                "Fetching contact message page. page={}, size={}, sort={}",
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pageable.getSort()
        );

        return PageResponse.from(
                contactMessageRepository.findAll(pageable)
                        .map(contactMessageMapper::toResponse)
        );
    }

    @Override
    public void delete(Long id) {

        log.info("Deleting contact message with ID: {}", id);

        ContactMessage contactMessage = findContactMessageById(id);
        contactMessageRepository.delete(contactMessage);

        log.info("Contact message deleted successfully with ID: {}", id);
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /**
     * Dispatches both outbound emails after the database transaction commits.
     * Each send operation is independently caught so a failure in owner
     * notification does not prevent the visitor acknowledgment, and vice versa.
     *
     * <p>Email delivery failures are logged at ERROR level but are never
     * re-thrown — the contact message is already safely stored.</p>
     *
     * @param message the committed contact message entity
     */
    private void dispatchEmails(ContactMessage message) {

        // 1. Owner notification
        try {
            emailService.sendOwnerNotification(message);
        } catch (EmailSendingException ex) {
            log.error("Owner notification failed for contact message ID: {}. " +
                      "Message is saved. Error: {}", message.getId(), ex.getMessage());
        } catch (Exception ex) {
            log.error("Unexpected error while sending owner notification for contact ID: {}. " +
                      "Message is saved. Error: {}", message.getId(), ex.getMessage(), ex);
        }

        // 2. Visitor acknowledgment
        try {
            emailService.sendVisitorAcknowledgment(message);
        } catch (EmailSendingException ex) {
            log.error("Visitor acknowledgment failed for contact message ID: {}. " +
                      "Message is saved. Error: {}", message.getId(), ex.getMessage());
        } catch (Exception ex) {
            log.error("Unexpected error while sending visitor acknowledgment for contact ID: {}. " +
                      "Message is saved. Error: {}", message.getId(), ex.getMessage(), ex);
        }
    }

    private ContactMessage findContactMessageById(Long id) {
        return contactMessageRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Contact message not found with ID: {}", id);
                    return new ResourceNotFoundException("ContactMessage", "id", id);
                });
    }
}
