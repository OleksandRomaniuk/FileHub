package com.teamdev.logout;

import com.google.common.truth.Truth;
import com.teamdev.authentication.AuthenticateUserCommand;
import com.teamdev.authentication.AuthenticationProcess;
import com.teamdev.registration.RegisterUserCommand;
import com.teamdev.resourse.ApplicationContext;
import com.teamdev.util.Command;
import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;
import org.junit.jupiter.api.Test;

class LogOutUserProcessTest {

    private ApplicationContext context = new ApplicationContext();


    @Test
    public void evaluationOfAuthentication() throws ProcessException {

        Command userCommand = new RegisterUserCommand("test@mail.gmail", "password");

        Process process = context.getUserRegistrationProcess();

        process.handle(userCommand);

        Command userCommand2 = new RegisterUserCommand("petr@mail.gmail", "gtnjgfh48245");

        process.handle(userCommand2);

        AuthenticateUserCommand authenticateUserCommand = new AuthenticateUserCommand("petr@mail.gmail", "gtnjgfh48245");

        AuthenticationProcess authenticationProcess = context.getUserAuthenticationProcess();

        String idOfPetr = authenticationProcess.handle(authenticateUserCommand);

        LogOutCommand logOutCommand = new LogOutCommand(idOfPetr);

        LogOutUserProcess logOutUserProcess = new LogOutUserProcess(context);

        String idOfUser = logOutUserProcess.handle(logOutCommand);

        Truth.assertThat(idOfUser).isEqualTo("petr@mail.gmail");

        boolean result = context.getAuthenticationDao().checkToken(idOfPetr);

        Truth.assertThat(result).isEqualTo(false);

    }

    @Test
    public void evaluationOfAuthenticationWithWrongToken() throws ProcessException {


        LogOutCommand logOutCommand = new LogOutCommand("test@mail.gmail");

        LogOutUserProcess logOutUserProcess = new LogOutUserProcess(context);

        String idOfUser = logOutUserProcess.handle(logOutCommand);

        Truth.assertThat(idOfUser).isEqualTo("You have to log in.");

    }


}