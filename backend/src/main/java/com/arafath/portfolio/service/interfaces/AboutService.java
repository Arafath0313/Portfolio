package com.arafath.portfolio.service.interfaces;

import com.arafath.portfolio.dto.request.AboutRequest;
import com.arafath.portfolio.dto.response.AboutResponse;
import com.arafath.portfolio.storage.dto.FileUploadResponse;
import org.springframework.web.multipart.MultipartFile;

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

    /**
     * Uploads or replaces the profile image for the About record.
     *
     * @param id   About record identifier
     * @param file profile image file (JPEG, PNG, WebP)
     * @return upload result containing the public URL
     */
    FileUploadResponse uploadProfileImage(Long id, MultipartFile file);

}
