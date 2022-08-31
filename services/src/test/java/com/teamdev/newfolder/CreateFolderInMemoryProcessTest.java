package com.teamdev.newfolder;

import com.google.common.truth.Truth;
import com.teamdev.authentication.AuthenticateUserCommand;
import com.teamdev.authentication.AuthenticationProcess;
import com.teamdev.record.FileRecord;
import com.teamdev.registration.RegisterUserCommand;
import com.teamdev.resourse.ApplicationContext;
import com.teamdev.uploadfile.SaveFileCommand;
import com.teamdev.uploadfile.SaveFileProcess;
import com.teamdev.util.Command;
import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;
import com.teamdev.util.QueryRequestException;
import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

class CreateFolderInMemoryProcessTest {

    private ApplicationContext context = new ApplicationContext();

    @Test
    void createFolderTest() throws ProcessException, QueryRequestException {

        Command userCommand
                = new RegisterUserCommand("petr@mail.gmail", "gtnjgfh48245");

        Process process = context.getUserRegistrationProcess();

        process.handle(userCommand);

        AuthenticateUserCommand authenticateUserCommand
                = new AuthenticateUserCommand("petr@mail.gmail", "gtnjgfh48245");

        AuthenticationProcess authenticationProcess = context.getUserAuthenticationProcess();

        String idOfPetr = authenticationProcess.handle(authenticateUserCommand);
        

        CreateFolderCommand createFile = new CreateFolderCommand("study", "", idOfPetr);

        CreateFolderProcess createFolderProcess = context.getCreateFolderProcess();

        String idOfFolder1 = createFolderProcess.handle(createFile);

         createFile = new CreateFolderCommand("math", idOfFolder1, idOfPetr);

        String idOfFolder2 = createFolderProcess.handle(createFile);

        FileInputStream fileInputStream;

        try {
             fileInputStream = new FileInputStream("./testdirectory/math.txt");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e.getMessage());
        }

        SaveFileCommand uploadCommand = new SaveFileCommand(
                fileInputStream,
                "math",
                2.0
                , "txt",
                idOfPetr,
                idOfFolder2);

        SaveFileProcess saveFileProcess = context.getSaveProcess();

        String idFile = saveFileProcess.handle(uploadCommand);


        FileRecord fileRecord = context.getFileDao().readById(idFile);

        Truth.assertThat(fileRecord.getIdOfParentFolder()).isEqualTo(idOfFolder2);

    }

}