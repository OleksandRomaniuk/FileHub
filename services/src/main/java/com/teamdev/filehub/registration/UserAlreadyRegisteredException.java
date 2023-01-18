package com.teamdev.filehub.registration;

import com.teamdev.filehub.ProcessException;

public class UserAlreadyRegisteredException extends ProcessException {

    public UserAlreadyRegisteredException(String message) {
        super(message);
    }
}

