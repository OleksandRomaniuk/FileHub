package com.teamdev.filehub.authentication;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.Command;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * This is the user's intention to authenticate in the FileHub application
 */
public class AuthenticateUserCommand implements Command {

    private final String email;

    private final String password;

    @ParametersAreNonnullByDefault
    public AuthenticateUserCommand(String email, String password) {

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
