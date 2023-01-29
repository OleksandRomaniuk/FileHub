package com.teamdev.filehub.resourse;

import com.teamdev.filehub.authenticateduser.AuthenticatedUserView;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import com.teamdev.filehub.database.DataBase;
import com.teamdev.filehub.delete.DeleteFileProcess;
import com.teamdev.filehub.delete.DeleteFolderProcess;
import com.teamdev.filehub.downaldfile.DownloadFileView;
import com.teamdev.filehub.downaldfile.DownloadView;
import com.teamdev.filehub.getdata.folder.FolderDataView;
import com.teamdev.filehub.getdata.folder.FolderView;
import com.teamdev.filehub.getdata.folder.content.FolderContentDataView;
import com.teamdev.filehub.getdata.folder.content.FolderContentView;
import com.teamdev.filehub.search.FolderContentByNameView;
import com.teamdev.filehub.search.FolderContentDataByNameView;
import com.teamdev.filehub.getdata.user.UserDataView;
import com.teamdev.filehub.logout.LogOutProcess;
import com.teamdev.filehub.logout.LogOutUserProcess;
import com.teamdev.filehub.newfolder.CreateFolderInMemoryProcess;
import com.teamdev.filehub.newfolder.CreateFolderProcess;
import com.teamdev.filehub.registration.UserRegistrationProcess;
import com.teamdev.filehub.renaming.RenamingFileProcess;
import com.teamdev.filehub.renaming.RenamingFolderProcess;
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

    private final CreateFolderProcess createFolderProcess;

    private final UserAuthenticationProcess userAuthenticationProcess;

    private final UserRegistrationProcess userRegistrationProcess;

    private final RenamingFileProcess renamingFileProcess;

    private final RenamingFolderProcess renamingFolderProcess;

    private final DeleteFileProcess deleteFileProcess;

    private final DeleteFolderProcess deleteFolderProcess;

    private final DownloadView downloadView;

    private final UserDataView gettingUserView;

    private final FolderView folderView;

    private final FolderContentView folderContentView;

    private final FolderContentByNameView folderContentByNameView;

    private final AuthenticatedView authenticatedView;

    private final LogOutProcess logOutProcess;

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

        downloadView = new DownloadFileView(fileDao, fileStorage);

        gettingUserView = new UserDataView(userDao, folderDao);

        folderView = new FolderDataView(folderDao);

        folderContentView = new FolderContentDataView(folderDao, fileDao);

        folderContentByNameView = new FolderContentDataByNameView(folderDao, fileDao);

        createFolderProcess = new CreateFolderInMemoryProcess(folderDao);

        renamingFileProcess = new RenamingFileProcess(fileDao);

        renamingFolderProcess = new RenamingFolderProcess(folderDao);

        logOutProcess = new LogOutUserProcess(authenticationDao);

        authenticatedView = new AuthenticatedUserView(authenticationDao);

        deleteFileProcess = new DeleteFileProcess(fileStorage, fileDao);

        deleteFolderProcess = new DeleteFolderProcess(fileStorage, fileDao, folderDao);
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
    public SaveFileProcess getSaveProcess() {
        return saveFileProcess;
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
    public SaveFileProcess getSaveFileProcess() {
        return saveFileProcess;
    }

    @Override
    public RenamingFileProcess getRenamingFileProcess() {
        return renamingFileProcess;
    }

    @Override
    public RenamingFolderProcess getRenamingFolderProcess() {
        return renamingFolderProcess;
    }

    @Override
    public DeleteFileProcess getDeleteFileProcess() {
        return deleteFileProcess;
    }

    @Override
    public DeleteFolderProcess getDeleteFolderProcess() {
        return deleteFolderProcess;
    }

    @Override
    public LogOutProcess getLogOutProcess() {
        return logOutProcess;
    }

    @Override
    public DownloadView getDownloadView() {
        return downloadView;
    }

    @Override
    public UserDataView getUserView() {
        return gettingUserView;
    }

    @Override
    public FolderView getFolderView() {
        return folderView;
    }

    @Override
    public FolderContentView getFolderContentView() {
        return folderContentView;
    }

    @Override
    public FolderContentByNameView getFolderContentByNameView() {
        return folderContentByNameView;
    }

    @Override
    public AuthenticatedView getAuthenticatedView() {
        return authenticatedView;
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
