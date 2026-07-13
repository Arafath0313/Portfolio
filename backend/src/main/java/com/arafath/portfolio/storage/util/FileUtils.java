package com.arafath.portfolio.storage.util;

import org.springframework.util.StringUtils;

/**
 * Utility functions for analyzing file names and extensions.
 */
public final class FileUtils {

    private FileUtils() {
        // Prevent instantiation
    }

    /**
     * Extracts extension from file name safely.
     *
     * @param filename name of the file
     * @return lowercase extension or empty string
     */
    public static String getFileExtension(String filename) {
        if (!StringUtils.hasText(filename)) {
            return "";
        }
        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex == -1 || lastDotIndex == filename.length() - 1) {
            return "";
        }
        return filename.substring(lastDotIndex + 1).toLowerCase();
    }

    /**
     * Cleans original filename to prevent path traversal attempts.
     *
     * @param filename original input name
     * @return cleaned name
     */
    public static String cleanFilename(String filename) {
        if (!StringUtils.hasText(filename)) {
            return "unknown";
        }
        String clean = StringUtils.cleanPath(filename);
        int lastSlash = Math.max(clean.lastIndexOf('/'), clean.lastIndexOf('\\'));
        if (lastSlash != -1) {
            clean = clean.substring(lastSlash + 1);
        }
        return clean;
    }
}
