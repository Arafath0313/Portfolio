package com.arafath.portfolio.storage.exception;

/**
 * Exception thrown when the file storage system fails to initialize directories on startup.
 */
public class StorageInitializationException extends RuntimeException {

    public StorageInitializationException(String message) {
        super(message);
    }

    public StorageInitializationException(String message, Throwable cause) {
        super(message, cause);
    }
}
