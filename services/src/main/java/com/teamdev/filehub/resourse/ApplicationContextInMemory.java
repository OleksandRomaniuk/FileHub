package com.teamdev.filehub.resourse;

import com.teamdev.filehub.authenticateduser.AuthenticatedUserView;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import com.teamdev.filehub.database.DataBase;
import com.teamdev.filehub.delete.DeleteFileProcess;
import com.teamdev.filehub.delete.DeleteFolderProcess;
import com.teamdev.filehub.downaldfile.DownloadFileView;
import com.teamdev.filehub.downaldfile.DownloadView;
import com.teamdev.filehub.getdata.folder.GetFolderDataView;
import com.teamdev.filehub.getdata.folder.GetFolderView;
import com.teamdev.filehub.getdata.folder.content.GetFolderContentDataView;
import com.teamdev.filehub.getdata.folder.content.GetFolderContentView;
import com.teamdev.filehub.getdata.folder.content.search.GetFolderContentByNameView;
import com.teamdev.filehub.getdata.folder.content.search.GetFolderContentDataByNameView;
import com.teamdev.filehub.getdata.user.GetUserDataView;
import com.teamdev.filehub.logout.LogOutProcess;
import com.teamdev.filehub.logout.LogOutUserProcess;
import com.teamdev.filehub.newfolder.CreateFolderInMemoryProcess;
import com.teamdev.filehub.newfolder.CreateFolderProcess;
import com.teamdev.filehub.registration.UserRegistrationProcess;
import com.teamdev.filehub.renaming.file.RenamingFileProcess;
import com.teamdev.filehub.renaming.folder.RenamingFolderProcess;
import com.teamdev.filehub.repository.AuthenticationDao;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.repository.UserDao;
import com.teamdev.filehub.repository.inmemory.AuthenticationDaoInMemory;
import com.teamdev.filehub.repository.inmemory.FileDaoInMemory;
import com.teamdev.filehub.repository.inmemory.FolderInMemoryDao;
import com.teamdev.filehub.repository.inmemory.UserDaoInMemory;
import com.teamdev.filehub.savefile.SaveFileProcess;
import com.teamdev.filehub.storage.FileStorage;


public class ApplicationContextInMemory implements ApplicationContext {

    private final AuthenticationDao authenticationDao;

    private final FileDao fileDao;

    private final UserDao userDao;

    private final SaveFileProcess saveFileProcess;

    private final FolderDao folderDao;

    private final UserAuthenticationProcess userAuthenticationProcess;

    private final UserRegistrationProcess userRegistrationProcess;

    public ApplicationContextInMemory() {

        DataBase base = new DataBase();

        authenticationDao = new AuthenticationDaoInMemory(base);

        fileDao = new FileDaoInMemory(base);

        userDao = new UserDaoInMemory(base);

        folderDao = new FolderInMemoryDao(base);

        FileStorage fileStorage = new FileStorage();

        saveFileProcess = new SaveFileProcess(fileDao, fileStorage);

        userAuthenticationProcess = new UserAuthenticationProcess(userDao, authenticationDao);

        userRegistrationProcess = new UserRegistrationProcess(userDao, folderDao);

    }

    @Override
    public AuthenticationDao getAuthenticationDao() {
        return authenticationDao;
    }

    @Override
    public UserDao getUserDao() {
        return userDao;
    }

    @Override
    public UserAuthenticationProcess getUserAuthenticationProcess() {
        return userAuthenticationProcess;
    }

    @Override
    public UserRegistrationProcess getUserRegistrationProcess() {
        return userRegistrationProcess;
    }


    @Override
    public GetUserDataView getUserView() {
        return gettingUserView;
    }


}
