package com.teamdev.filehub.authentication;

import com.teamdev.filehub.ProcessException;
/**
 * Thrown when user tries to log in the FileHub application and email or password is incorrect.
 */
public class AuthenticationException extends ProcessException {

    public AuthenticationException(String message) {
        super(message);
    }
}

