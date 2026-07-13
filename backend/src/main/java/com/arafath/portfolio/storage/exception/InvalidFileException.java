package com.arafath.portfolio.storage.exception;

/**
 * Exception thrown when a file is invalid (e.g. invalid filename, contains path traversal sequences).
 */
public class InvalidFileException extends FileStorageException {

    public InvalidFileException(String message) {
        super(message);
    }

    public InvalidFileException(String message, Throwable cause) {
        super(message, cause);
    }
}
