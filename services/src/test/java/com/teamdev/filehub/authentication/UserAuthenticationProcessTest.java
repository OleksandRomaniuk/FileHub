package com.teamdev.filehub.authentication;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.Command;
import com.teamdev.filehub.Process;
import com.teamdev.filehub.ProcessException;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserCommand;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserTokensRecord;
import com.teamdev.filehub.registration.RegisterUserCommand;
import com.teamdev.filehub.resourse.ApplicationContextInMemory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

class UserAuthenticationProcessTest {

    ApplicationContextInMemory context = new ApplicationContextInMemory();
    @BeforeEach
    void addUsers() throws ProcessException {

        Command userCommand = new RegisterUserCommand("aehandr@gmail.com", "passworAAAAx");

        Process process = context.getUserRegistrationProcess();

        process.handle(userCommand);

        Command userCommand2 = new RegisterUserCommand("ar@gmail.com", "passwox");

        process.handle(userCommand2);
    }
    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(UserAuthenticationProcess.class);
    }
}
