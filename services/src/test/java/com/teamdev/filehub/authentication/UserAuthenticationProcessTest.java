package com.teamdev.filehub.authentication;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.Process;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.registration.RegisterUserCommand;
import com.teamdev.filehub.resourse.ApplicationContextInMemory;
import com.teamdev.filehub.user.credentials.UserMariaCredentials;
import com.teamdev.filehub.user.credentials.UserPetrCredentials;
import com.teamdev.filehub.Command;
import com.teamdev.filehub.record.UserTokensRecord;
import com.teamdev.filehub.ProcessException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

class UserAuthenticationProcessTest {

    ApplicationContextInMemory context = new ApplicationContextInMemory();

    UserMariaCredentials maria = new UserMariaCredentials();

    UserPetrCredentials petr = new UserPetrCredentials();

    @BeforeEach
    void addUsers() throws ProcessException {

        Command userCommand = new RegisterUserCommand(maria.getEmail(), maria.getPassword());

        Process process = context.getUserRegistrationProcess();

        process.handle(userCommand);

        Command userCommand2 = new RegisterUserCommand(petr.getEmail(), petr.getPassword());

        process.handle(userCommand2);
    }

    @Test
    public void evaluationOfAuthentication() throws ProcessException {

        Command userCommand = new AuthenticateUserCommand(maria.getEmail(), maria.getPassword());

        Process process = context.getUserAuthenticationProcess();

        process.handle(userCommand);

        Optional<UserTokensRecord> userTokensRecord;

        userTokensRecord = context.getAuthenticationDao().read(new RecordId(maria.getEmail()));

        Truth.assertThat(userTokensRecord.get().getToken()).isNotEmpty();
    }

    @Test
    void authenticateWithWrongPassword() {
        Command userCommand = new AuthenticateUserCommand(maria.getEmail(), "padbfssword");

        Process process = context.getUserAuthenticationProcess();

        var expressionException
                = Assertions.assertThrows(ProcessException.class,
                () -> process.handle(userCommand));

        Assertions.assertEquals("Email or password uncorrected.", expressionException.getMessage(),
                "Email or password uncorrected.");
    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(UserAuthenticationProcess.class);
    }
}
