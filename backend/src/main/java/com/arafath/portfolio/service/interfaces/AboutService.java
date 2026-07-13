package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.AboutRequest;
import com.arafath.portfolio.dto.response.AboutResponse;

public interface AboutService {

    /**
     * Creates portfolio About information.
     */
    AboutResponse create(AboutRequest request);

    /**
     * Updates portfolio About information.
     */
    AboutResponse update(Long id, AboutRequest request);

    /**
     * Returns About information by ID.
     */
    AboutResponse getById(Long id);

    /**
     * Returns the portfolio About information.
     */
    AboutResponse get();

    /**
     * Deletes About information.
     */
    void delete(Long id);

}
