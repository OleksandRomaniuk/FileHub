package com.teamdev.filehub.newfolder;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.ProcessException;
import com.teamdev.filehub.authentication.AuthenticationCommand;
import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.registration.RegisterUserCommand;
import com.teamdev.filehub.registration.UserRegistrationProcess;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.resourse.ApplicationContextInMemory;
import org.junit.jupiter.api.Test;

import java.util.Optional;

class CreateFolderInMemoryProcessTest {

    ApplicationContextInMemory context = new ApplicationContextInMemory();
    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(CreateFolderProcess.class);
    }

    @Test
    void CreateFolderInMemoryTest() throws ProcessException {

        RegisterUserCommand registerUserCommand = new RegisterUserCommand("aehandr@gmail.com", "passworAAAAx");

        UserRegistrationProcess process = context.getUserRegistrationProcess();

        process.handle(registerUserCommand);

        AuthenticationCommand authenticateUserCommand
                = new AuthenticationCommand("aehandr@gmail.com", "passworAAAAx");

        UserAuthenticationProcess authenticationProcess = context.getUserAuthenticationProcess();

        String userId = authenticationProcess.handle(authenticateUserCommand);



        CreateFolderCommand createFolderCommand
                = new CreateFolderCommand("study",userId + "Root", userId);

        CreateFolderProcess createFolderProcess = context.getCreateFolderProcess();

        String firstFolderId = createFolderProcess.handle(createFolderCommand);


        createFolderCommand = new CreateFolderCommand("math", firstFolderId, userId);


        String secondFolderId = createFolderProcess.handle(createFolderCommand);


        FolderDao folderDao = context.getFolderDao();

        Optional<FolderRecord> folderRecord = folderDao.read(new RecordId(secondFolderId));

        Truth.assertThat(folderRecord.get().getParentId()).isEqualTo(firstFolderId);

        folderRecord = folderDao.read(new RecordId(firstFolderId));

        Truth.assertThat(folderRecord.get().getName()).isEqualTo("study");



    }




}
