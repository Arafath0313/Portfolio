package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.common.pagination.PageResponse;
import com.arafath.portfolio.dto.request.ContactMessagePatchRequest;
import com.arafath.portfolio.dto.request.ContactMessageRequest;
import com.arafath.portfolio.dto.response.ContactMessageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ContactMessageService {

    ContactMessageResponse create(ContactMessageRequest request);

    ContactMessageResponse update(Long id, ContactMessageRequest request);

    ContactMessageResponse patch(Long id, ContactMessagePatchRequest request);

    ContactMessageResponse getById(Long id);

    List<ContactMessageResponse> getAll();

    PageResponse<ContactMessageResponse> getPage(Pageable pageable);

    void delete(Long id);
}
