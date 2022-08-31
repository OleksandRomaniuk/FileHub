package com.teamdev.registration;

import com.google.common.base.Preconditions;
import com.teamdev.util.Command;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The implementation of {@link Command} that hold information about email
 * and password for future registration register process.
 */
public class RegisterUserCommand implements Command {

    private final String email;

    private final String password;

    @ParametersAreNonnullByDefault
    public RegisterUserCommand(String email, String password) {

        Preconditions.checkNotNull(email);
        Preconditions.checkNotNull(password);
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
