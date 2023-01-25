package com.teamdev.filehub.resourse;

import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import com.teamdev.filehub.getdata.folder.GetFolderDataView;
import com.teamdev.filehub.getdata.folder.GetFolderView;
import com.teamdev.filehub.getdata.folder.content.GetFolderContentDataView;
import com.teamdev.filehub.getdata.folder.content.GetFolderContentView;
import com.teamdev.filehub.getdata.folder.content.search.GetFolderContentByNameView;
import com.teamdev.filehub.getdata.folder.content.search.GetFolderContentDataByNameView;
import com.teamdev.filehub.getdata.user.GetUserDataView;
import com.teamdev.filehub.registration.UserRegistrationProcess;
import com.teamdev.filehub.repository.AuthenticationDao;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.repository.UserDao;
import com.teamdev.filehub.repository.sql.AuthenticationDaoInDB;
import com.teamdev.filehub.repository.sql.FileDaoInDB;
import com.teamdev.filehub.repository.sql.FolderDaoInDB;
import com.teamdev.filehub.repository.sql.UserDaoInDB;
import com.teamdev.filehub.storage.FileStorage;

public class ApplicationContextJDBC implements ApplicationContext {

    private final AuthenticationDao authenticationDao;

    private final FileDao fileDao;

    private final UserDao userDao;

    private final FolderDao folderDao;

    private final CreateFolderProcess createFolderProcess;

    private final UserAuthenticationProcess userAuthenticationProcess;

    private final UserRegistrationProcess userRegistrationProcess;

    private final GetUserDataView gettingUserView;

    private final GetFolderView getFolderView;

    private final GetFolderContentView getFolderContentView;

    private final GetFolderContentByNameView getFolderContentByNameView;

    private final AuthenticatedView authenticatedUserView;

    public ApplicationContextJDBC() {

        authenticationDao = new AuthenticationDaoInDB();

        fileDao = new FileDaoInDB();

        userDao = new UserDaoInDB();

        folderDao = new FolderDaoInDB();

        FileStorage fileStorage = new FileStorage();

        userAuthenticationProcess = new UserAuthenticationProcess(userDao, authenticationDao);

        userRegistrationProcess = new UserRegistrationProcess(userDao, folderDao);

        createFolderProcess = new CreateFolderInMemoryProcess(folderDao);

        gettingUserView = new GetUserDataView(userDao, folderDao);

        getFolderView = new GetFolderDataView(folderDao);

        getFolderContentView = new GetFolderContentDataView(folderDao, fileDao);

        getFolderContentByNameView = new GetFolderContentDataByNameView(folderDao, fileDao);

          }

    @Override
    public AuthenticationDao getAuthenticationDao() {
        return authenticationDao;
    }

    @Override
    public FileDao getFileDao() {
        return fileDao;
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

    @Override
    public GetFolderView getFolderView() {
        return getFolderView;
    }

    @Override
    public GetFolderContentView getFolderContentView() {
        return getFolderContentView;
    }

    @Override
    public GetFolderContentByNameView getFolderContentByNameView() {
        return getFolderContentByNameView;
    }

    @Override
    public AuthenticatedView getAuthenticatedView() {
        return authenticatedUserView;
    }

    @Override
    public CreateFolderProcess getCreateFolderProcess() {
        return createFolderProcess;
    }

    @Override
    public FolderDao getFolderDao() {
        return folderDao;
    }
}
