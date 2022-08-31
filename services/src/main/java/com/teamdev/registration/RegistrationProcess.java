package com.teamdev.registration;

import com.teamdev.record.UserId;
import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;


/**
 * The implementation of {@link Process} for handling {@link RegisterUserCommand} and returning id of user.
 */

public interface RegistrationProcess extends Process<RegisterUserCommand, UserId> {
    @Override
    UserId handle(RegisterUserCommand command) throws ProcessException;
}
