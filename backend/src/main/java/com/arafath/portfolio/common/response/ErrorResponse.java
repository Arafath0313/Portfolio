package com.arafath.portfolio.common.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ErrorResponse {

    /**
     * Indicates whether the request was successful.
     */
    private final boolean success;

    /**
     * HTTP status code.
     */
    private final int status;

    /**
     * Error message.
     */
    private final String message;

    /**
     * Validation errors or detailed error messages.
     */
    private final List<String> errors;

    /**
     * API request path.
     */
    private final String path;

    /**
     * Timestamp when the error occurred.
     */
    private final LocalDateTime timestamp;

    /**
     * Creates a standard error response.
     */
    public static ErrorResponse of(
            int status,
            String message,
            List<String> errors,
            String path
    ) {

        return ErrorResponse.builder()
                .success(false)
                .status(status)
                .message(message)
                .errors(errors)
                .path(path)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Creates an error response without validation details.
     */
    public static ErrorResponse of(
            int status,
            String message,
            String path
    ) {

        return ErrorResponse.builder()
                .success(false)
                .status(status)
                .message(message)
                .errors(null)
                .path(path)
                .timestamp(LocalDateTime.now())
                .build();
    }
}