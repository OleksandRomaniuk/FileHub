package com.teamdev.filehub.registration;

import com.teamdev.filehub.Process;
import com.teamdev.filehub.record.RecordId;


@FunctionalInterface
public interface RegistrationProcess extends Process<RegisterUserCommand, RecordId> {
    @Override
    RecordId handle(RegisterUserCommand command) throws UserAlreadyRegisteredException;
}
