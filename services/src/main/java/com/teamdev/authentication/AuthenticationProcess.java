package com.teamdev.authentication;

import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;

/**
 * The implementation of {@link Process} for handling {@link AuthenticateUserCommand}.
 */
public interface AuthenticationProcess extends Process<AuthenticateUserCommand, String> {
    @Override
    String handle(AuthenticateUserCommand command) throws ProcessException;
}
