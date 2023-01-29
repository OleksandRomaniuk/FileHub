package com.teamdev.filehub.authentication;

import com.teamdev.filehub.ProcessException;
/**
 * Exception in case email or password is incorrect.
 */
public class AuthenticationException extends ProcessException {
    public AuthenticationException(String message) {
        super(message);
    }
}

