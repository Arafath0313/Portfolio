package com.arafath.portfolio.storage.validation;

import com.arafath.portfolio.storage.exception.FileValidationException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

/**
 * Validator to check PDF and Image file integrity.
 */
@Component
public class ImageValidator {

    /**
     * Validates image or PDF integrity.
     *
     * @param file the MultipartFile to validate
     * @param isPdf true if PDF document validation is needed, false for images
     */
    public void validateIntegrity(MultipartFile file, boolean isPdf) {
        try (InputStream is = file.getInputStream()) {
            if (isPdf) {
                // PDF validation: check magic bytes %PDF-
                byte[] header = new byte[5];
                int read = is.read(header);
                if (read < 5 || !"%PDF-".equals(new String(header))) {
                    throw new FileValidationException("PDF file integrity check failed: Invalid PDF structure.");
                }
            } else {
                // Image validation using ImageIO
                BufferedImage image = ImageIO.read(is);
                if (image == null) {
                    throw new FileValidationException("Image file integrity check failed: Invalid or malformed image.");
                }
                if (image.getWidth() <= 0 || image.getHeight() <= 0) {
                    throw new FileValidationException("Image dimensions are invalid.");
                }
            }
        } catch (IOException e) {
            throw new FileValidationException("Failed to read file for integrity check.", e);
        }
    }
}
