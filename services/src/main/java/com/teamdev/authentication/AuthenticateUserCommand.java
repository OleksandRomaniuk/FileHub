package com.teamdev.authentication;

import com.google.common.base.Preconditions;
import com.teamdev.util.Command;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The implementation of {@link Command}
 * that holds information about email and password for authentication future process.
 */
public class AuthenticateUserCommand implements Command {

    String email;

    String password;

    @ParametersAreNonnullByDefault
    public AuthenticateUserCommand(String email, String password) {

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

    public void setPassword(String password) {
        this.password = password;
    }
}
