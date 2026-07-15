package com.arafath.portfolio.storage.enums;

import lombok.Getter;

/**
 * Categories of files supported by the media management system.
 * Each category maps to its corresponding subfolder name.
 */
@Getter
public enum FileCategory {
    ABOUT("about"),
    RESUME("resumes"),
    PROJECT("projects"),
    CERTIFICATE("certificates"),
    PASSION("passions"),
    LOGO("logos"),
    FAVICON("favicons");

    private final String folderName;

    FileCategory(String folderName) {
        this.folderName = folderName;
    }
}
