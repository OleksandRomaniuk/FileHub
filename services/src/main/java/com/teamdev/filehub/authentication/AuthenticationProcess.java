package com.teamdev.filehub.authentication;

import com.teamdev.filehub.Process;

/**
 * The process for authentication users in FileHub application.
 * The class uses data from {@link AuthenticateUserCommand} for get user token from server and check validity.
 */
@FunctionalInterface
public interface AuthenticationProcess extends Process<AuthenticateUserCommand, String> {
    @Override
    String handle(AuthenticateUserCommand command) throws AuthenticationException;
}
