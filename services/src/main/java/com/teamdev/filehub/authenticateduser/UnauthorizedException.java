package com.teamdev.filehub.authenticateduser;

/**
 * Thrown when token is invalid or does not exist.
 */
public class UnauthorizedException extends Exception {

    public UnauthorizedException() {
        super("Token is not valid");
    }
}
