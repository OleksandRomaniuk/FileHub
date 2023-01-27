package com.teamdev.spark;


import javax.annotation.ParametersAreNonnullByDefault;
import java.util.ArrayList;
import java.util.List;

/**
 * The class to respond to when registration fails in {@link RegistrationRoute}.
 */
public class RegistrationError {
    private final List<ValidationError> errors = new ArrayList<>();

    @ParametersAreNonnullByDefault
    public void addError(String name, String message) {
        errors.add(new ValidationError(name, message));
    }

    public List<ValidationError> getErrors() {
        return errors;
    }
}
