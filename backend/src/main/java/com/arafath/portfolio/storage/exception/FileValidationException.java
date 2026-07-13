package com.arafath.portfolio.storage.exception;

/**
 * Exception thrown when a file fails validation (e.g. file size exceeds limits, mime type not allowed).
 */
public class FileValidationException extends FileStorageException {

    public FileValidationException(String message) {
        super(message);
    }

    public FileValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
