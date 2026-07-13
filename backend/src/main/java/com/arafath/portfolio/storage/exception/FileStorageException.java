package com.arafath.portfolio.storage.exception;

import com.arafath.portfolio.exception.BusinessException;

/**
 * Base exception for general storage operations.
 */
public class FileStorageException extends BusinessException {

    public FileStorageException(String message) {
        super(message);
    }

    public FileStorageException(String message, Throwable cause) {
        super(message);
        initCause(cause);
    }
}
