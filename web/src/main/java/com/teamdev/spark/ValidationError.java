package com.teamdev.spark;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The class that contains validation error with data about field, and it's error.
 */
public class ValidationError {
    private final String name;
    private final String message;

    @ParametersAreNonnullByDefault
    public ValidationError(String name, String message) {
        this.name = Preconditions.checkNotNull(name);
        this.message = Preconditions.checkNotNull(message);
    }

    public String getName() {
        return name;
    }

    public String getMessage() {
        return message;
    }
}
