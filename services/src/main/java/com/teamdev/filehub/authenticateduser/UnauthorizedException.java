package com.teamdev.filehub.authenticateduser;

/**
 * Thrown when user tries to get data or change them and token is invalid or does not exist.
 */
public class UnauthorizedException extends Exception {

    public UnauthorizedException() {
        super("Token is not valid");
    }
}
