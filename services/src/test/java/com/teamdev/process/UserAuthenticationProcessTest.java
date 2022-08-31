package com.teamdev.process;

import com.google.common.truth.Truth;
import com.teamdev.authentication.AuthenticateUserCommand;
import com.teamdev.authentication.UserAuthenticationProcess;
import com.teamdev.util.Command;
import com.teamdev.registration.RegisterUserCommand;
import com.teamdev.record.UserTokensRecord;
import com.teamdev.registration.UserRegistrationProcess;
import com.teamdev.resourse.ApplicationContext;
import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;
import com.teamdev.util.QueryRequestException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UserAuthenticationProcessTest {

    ApplicationContext context = new ApplicationContext();


    @BeforeEach
    void addUsers() throws ProcessException {


        Command userCommand = new RegisterUserCommand("test@mail.gmail", "password");

        Process process = context.getUserRegistrationProcess();

        process.handle(userCommand);

        Command userCommand2 = new RegisterUserCommand("petr@mail.gmail", "gtnjgfh48245");

        process.handle(userCommand2);
    }

    @Test
    public void evaluationOfAuthentication() throws ProcessException {


        Command userCommand = new AuthenticateUserCommand("test@mail.gmail", "password");

        Process process = context.getUserAuthenticationProcess();

        process.handle(userCommand);

        UserTokensRecord userTokensRecord = null;
        try {
            userTokensRecord = context.getAuthenticationDao().readById("test@mail.gmail");
        } catch (QueryRequestException e) {
            e.printStackTrace();
        }


        Truth.assertThat(userTokensRecord.getToken()).isNotEmpty();

    }

    @Test
    void authenticateWithWrongPassword() {
        Command userCommand = new AuthenticateUserCommand("test@mail.gmail", "padbfssword");

        Process process = context.getUserAuthenticationProcess();


        var expressionException
                = Assertions.assertThrows(ProcessException.class,
                () -> process.handle(userCommand));

        Assertions.assertEquals("login or password is invalid", expressionException.getMessage(),
                "login or password is invalid");
    }

}