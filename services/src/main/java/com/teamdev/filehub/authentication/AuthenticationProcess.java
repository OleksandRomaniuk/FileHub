package com.teamdev.filehub.authentication;

import com.teamdev.filehub.Process;

/**
 * The process for authentication users inapplication.
 */
@FunctionalInterface
public interface AuthenticationProcess extends Process<AuthenticationCommand, String> {
    @Override
    String handle(AuthenticationCommand command) throws AuthenticationException;
}
