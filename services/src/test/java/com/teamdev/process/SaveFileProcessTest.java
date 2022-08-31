package com.teamdev.process;

import com.google.common.truth.Truth;
import com.teamdev.authentication.AuthenticateUserCommand;
import com.teamdev.registration.RegisterUserCommand;
import com.teamdev.resourse.ApplicationContext;
import com.teamdev.uploadfile.SaveFileCommand;
import com.teamdev.util.Command;
import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

class SaveFileProcessTest {


    @Test
    public void uploadProcessTest() throws ProcessException, IOException {

        ApplicationContext context = new ApplicationContext();

        Command userCommand = new RegisterUserCommand("test@mail.gmail", "password");

        Process process = context.getUserRegistrationProcess();

        process.handle(userCommand);

        Command userCommand2 = new RegisterUserCommand("petr@mail.gmail", "gtnjgfh48245");

        process.handle(userCommand2);

        userCommand = new AuthenticateUserCommand("test@mail.gmail", "password");

        process = context.getUserAuthenticationProcess();

        process.handle(userCommand);


        FileInputStream fileInputStream = new FileInputStream("./testdirectory/text.txt");

        Command uploadCommand = new SaveFileCommand(
                fileInputStream,
                "test",
                2.0
                , "txt",
                "test@mail.gmail",
                "");

        Process uploadProcess = context.getSaveProcess();

        uploadProcess.handle(uploadCommand);


        File file = new File("./src/main/resources/testmailgmail/testmailgmail.txt");

        File expexted = new File("./testdirectory/text.txt");

        Truth.assertThat(FileUtils.contentEquals(expexted, file)).isEqualTo(true);


    }


}