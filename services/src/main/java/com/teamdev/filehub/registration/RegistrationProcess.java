package com.teamdev.filehub.registration;

import com.teamdev.filehub.Process;
import com.teamdev.filehub.record.RecordId;


/**
 * The implementation of {@link Process} for handling {@link RegisterUserCommand} and returning id of user.
 */
@FunctionalInterface
public interface RegistrationProcess extends Process<RegisterUserCommand, RecordId> {
    @Override
    RecordId handle(RegisterUserCommand command) throws UserAlreadyRegisteredException;
}
