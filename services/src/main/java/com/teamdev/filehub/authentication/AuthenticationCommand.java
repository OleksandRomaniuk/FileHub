package com.teamdev.filehub.authentication;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.Command;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * User's data for authentication
 */
public class AuthenticationCommand implements Command {

    private final String email;

    private final String password;

    @ParametersAreNonnullByDefault
    public AuthenticationCommand(String email, String password) {

        this.email = Preconditions.checkNotNull(email);
        this.password = Preconditions.checkNotNull(password);
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
