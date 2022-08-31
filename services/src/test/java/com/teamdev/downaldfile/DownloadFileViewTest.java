package com.teamdev.downaldfile;

import com.google.common.truth.Truth;
import com.teamdev.authentication.AuthenticateUserCommand;
import com.teamdev.authentication.UserAuthenticationProcess;
import com.teamdev.registration.RegisterUserCommand;
import com.teamdev.registration.UserRegistrationProcess;
import com.teamdev.resourse.ApplicationContext;
import com.teamdev.uploadfile.SaveFileCommand;
import com.teamdev.uploadfile.SaveFileProcess;
import com.teamdev.util.Command;
import com.teamdev.util.DownloadException;
import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

class DownloadFileViewTest {

    private  static ApplicationContext applicationContext = new ApplicationContext();

    private static String idOfFile;

    private static String idUser;

    @BeforeAll
    static void setUsers() {

        Command userCommand = new RegisterUserCommand("test@mail.gmail", "password");

        Process process = applicationContext.getUserRegistrationProcess();

        try {
            process.handle(userCommand);
        } catch (ProcessException e) {
            e.printStackTrace();
        }


        AuthenticateUserCommand authenticateUserCommand = new AuthenticateUserCommand("test@mail.gmail", "password");

        UserAuthenticationProcess authenticationProcess = applicationContext.getUserAuthenticationProcess();


        try {
            idUser = authenticationProcess.handle(authenticateUserCommand);
        } catch (ProcessException e) {
            e.printStackTrace();
        }


        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream("./testdirectory/text.txt");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        SaveFileCommand saveFileCommand = new SaveFileCommand(
                fileInputStream,
                "test",
                2.0,
                "txt",
                idUser,
                "");


        SaveFileProcess uploadProcess = applicationContext.getSaveProcess();

        idOfFile = uploadProcess.handle(saveFileCommand);

    }

    @Test
    void downloadFileTest() {

        DownloadQuery downloadQuery = new DownloadQuery(idOfFile, idUser);

        DownloadView downloadView = applicationContext.getDownloadView();

        try {
            InputStream result = downloadView.run(downloadQuery);

            InputStream expected
                    = new FileInputStream("./src/test/resources/testmailgmail.txt");

            boolean compareResult = IOUtils.contentEquals(result, expected);

            Truth.assertThat(compareResult).isEqualTo(true);

        } catch (DownloadException | IOException e) {
            e.printStackTrace();
        }
    }
    @Test
    void downloadNonExistentFileTest() {

        DownloadQuery downloadQuery = new DownloadQuery("fdbbc v", "testlgmail.txt");

        DownloadView downloadFileView = applicationContext.getDownloadView();


            var expressionException
                    = Assertions.assertThrows(DownloadException.class,
                    () -> downloadFileView.run(downloadQuery));

            Assertions.assertEquals("there is no such file in the database.", expressionException.getMessage(),
                    "We found nonexisting file");

    }
    @Test
    void downloadFileFromWrongUserTest() {

        DownloadQuery downloadQuery = new DownloadQuery("idOfFile",  "test26@mail.gmail");

        DownloadView downloadView = applicationContext.getDownloadView();


        var expressionException
                = Assertions.assertThrows(DownloadException.class,
                () -> downloadView.run(downloadQuery));

        Assertions.assertEquals("there is no such file in the database.", expressionException.getMessage(),
                "We found nonexisting file");

    }

}