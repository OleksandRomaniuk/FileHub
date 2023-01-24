package com.teamdev.filehub.util;

import com.teamdev.filehub.ProcessException;

/**
 * The Exception for problems with validation for certain fields.
 */
public class ValidationException extends ProcessException {

    private final String field;
    private final String message;

    public ValidationException(String field, String message) {
        super(message);
        this.field = field;
        this.message = message;
    }

    public String getField() {
        return field;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
