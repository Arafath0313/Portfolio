package com.arafath.portfolio.storage.util;

import java.util.UUID;
import org.springframework.util.StringUtils;

/**
 * Utility for generating secure unique filenames.
 */
public final class FilenameGenerator {

    private FilenameGenerator() {
        // Prevent instantiation
    }

    /**
     * Generates a unique filename using UUID and preserves the original file extension.
     *
     * @param originalFilename original name of the file
     * @return unique generated filename
     */
    public static String generateUniqueName(String originalFilename) {
        String extension = FileUtils.getFileExtension(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return StringUtils.hasText(extension) ? uuid + "." + extension : uuid;
    }
}
