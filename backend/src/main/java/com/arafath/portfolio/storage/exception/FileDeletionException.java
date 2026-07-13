package com.arafath.portfolio.storage.exception;

/**
 * Exception thrown when a file deletion operation fails physically on the filesystem.
 */
public class FileDeletionException extends FileStorageException {

    public FileDeletionException(String message) {
        super(message);
    }

    public FileDeletionException(String message, Throwable cause) {
        super(message, cause);
    }
}
