package com.teamdev.spark.error;


import javax.annotation.ParametersAreNonnullByDefault;
import java.util.ArrayList;
import java.util.List;

/**
 * This example demonstrate the error in case registration fails
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
