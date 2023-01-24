package com.teamdev.filehub.registration;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.Command;
import com.teamdev.filehub.record.EmailValidator;
import com.teamdev.filehub.util.ValidationException;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * This is the user's intention to register in the FileHub application.
 */
public class RegisterUserCommand implements Command {

    private final String email;

    private final String password;

    @ParametersAreNonnullByDefault
    public RegisterUserCommand(String email, String password) throws ValidationException {

        Preconditions.checkNotNull(email);
        Preconditions.checkNotNull(password);

        if (!EmailValidator.validate(email)) {
            throw new ValidationException("email", "Wrong email.");
        }

        if (password.length() < 6) {
            throw new ValidationException("password", "Password should be more than 6 symbols.");
        }

        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
