package com.teamdev.resourse;

import com.teamdev.database.DataBase;
import com.teamdev.downaldfile.DownloadFileView;
import com.teamdev.downaldfile.DownloadView;
import com.teamdev.newfolder.CreateFolderInMemoryProcess;
import com.teamdev.newfolder.CreateFolderProcess;
import com.teamdev.record.FolderRecord;
import com.teamdev.record.UserId;
import com.teamdev.storage.FileStorage;
import com.teamdev.uploadfile.SaveFileProcess;
import com.teamdev.authentication.UserAuthenticationProcess;
import com.teamdev.registration.UserRegistrationProcess;
import com.teamdev.repository.*;
import com.teamdev.util.QueryRequestException;

public class ApplicationContext {

    private final AuthenticationDao authenticationDao;

    private final FileDao fileDao;

    private final UserDao userDao;

    private final SaveFileProcess saveFileProcess;

    private final FolderDao folderDao;

    private final CreateFolderProcess createFolderProcess;

    private final UserAuthenticationProcess userAuthenticationProcess;

    private final UserRegistrationProcess userRegistrationProcess;

    private final DownloadView downloadView;


    public ApplicationContext() {

        DataBase base = new DataBase();

        authenticationDao = new AuthenticationDaoInMemory(base);

        fileDao = new FileDaoInMemory(base);

        userDao = new UserDaoInMemory(base);

        folderDao = new FolderInMemoryDao(base);

        FileStorage fileStorage = new FileStorage();


        try {
            folderDao.create(new FolderRecord(

                    new UserId("root"), fileStorage.getRoot(), "system"));
        } catch (QueryRequestException e) {

            e.printStackTrace();
        }

        saveFileProcess = new SaveFileProcess(fileDao, authenticationDao);

        userAuthenticationProcess = new UserAuthenticationProcess( userDao, authenticationDao);

        userRegistrationProcess = new UserRegistrationProcess(userDao, folderDao);

        downloadView = new DownloadFileView(fileDao);

        createFolderProcess = new CreateFolderInMemoryProcess(folderDao);

    }

    public AuthenticationDao getAuthenticationDao() {
        return authenticationDao;
    }

    public FileDao getFileDao() {
        return fileDao;
    }

    public UserDao getUserDao() {
        return userDao;
    }

    public SaveFileProcess getSaveProcess() {
        return saveFileProcess;
    }

    public UserAuthenticationProcess getUserAuthenticationProcess() {
        return userAuthenticationProcess;
    }

    public UserRegistrationProcess getUserRegistrationProcess() {
        return userRegistrationProcess;
    }

    public SaveFileProcess getSaveFileProcess() {
        return saveFileProcess;
    }

    public DownloadView getDownloadView() {
        return downloadView;
    }

    public CreateFolderProcess getCreateFolderProcess() {
        return createFolderProcess;
    }
}
