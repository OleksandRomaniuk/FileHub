package com.teamdev.filehub;

import com.teamdev.filehub.ProcessException;


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
