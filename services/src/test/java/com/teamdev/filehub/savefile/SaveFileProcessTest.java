package com.teamdev.filehub.savefile;

import com.google.common.testing.NullPointerTester;
import com.teamdev.filehub.ProcessException;
import com.teamdev.filehub.authentication.AuthenticationCommand;
import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import com.teamdev.filehub.registration.RegisterUserCommand;
import com.teamdev.filehub.registration.UserRegistrationProcess;
import com.teamdev.filehub.resourse.ApplicationContextInMemory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

class SaveFileProcessTest {

    private final ApplicationContextInMemory context = new ApplicationContextInMemory();

    @TempDir
    File anotherTempDir;



    @Test
    public void uploadFileWithAlreadyExistNameProcessTest() throws ProcessException, IOException {


        RegisterUserCommand registerUserCommand = new RegisterUserCommand("alehandr@gmailcpm", "alehandr@gmailcpm");

        UserRegistrationProcess userRegistrationProcess = context.getUserRegistrationProcess();

        userRegistrationProcess.handle(registerUserCommand);

        AuthenticationCommand authenticateUserCommand
                = new AuthenticationCommand("alehandr@gmailcpm", "alehandr@gmailcpm");

        UserAuthenticationProcess userAuthenticationProcess = context.getUserAuthenticationProcess();

        String userId = userAuthenticationProcess.handle(authenticateUserCommand);


        FileInputStream fileInputStream = new FileInputStream("./testdirectory/text.txt");

        SaveFileCommand uploadCommand = new SaveFileCommand(
                fileInputStream,
                "test",
                "2.0"
                , "txt",
                userId,
                userId + "Root");

        SaveFileProcess uploadProcess = context.getSaveProcess();

        uploadProcess.handle(uploadCommand);

        var expressionException
                = Assertions.assertThrows(ProcessException.class,
                () -> uploadProcess.handle(uploadCommand));

        Assertions.assertEquals("File with such name already exist.", expressionException.getMessage(),
                "File with already exist name did not failed.");

    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(SaveFileProcess.class);
    }


}
