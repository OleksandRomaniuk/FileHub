package com.teamdev.filehub.resourse;

import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import com.teamdev.filehub.delete.DeleteFileProcess;
import com.teamdev.filehub.delete.DeleteFolderProcess;
import com.teamdev.filehub.downaldfile.DownloadView;
import com.teamdev.filehub.getdata.folder.GetFolderView;
import com.teamdev.filehub.getdata.folder.content.GetFolderContentView;
import com.teamdev.filehub.getdata.folder.content.search.GetFolderContentByNameView;
import com.teamdev.filehub.getdata.user.GetUserDataView;
import com.teamdev.filehub.logout.LogOutProcess;
import com.teamdev.filehub.newfolder.CreateFolderProcess;
import com.teamdev.filehub.registration.UserRegistrationProcess;
import com.teamdev.filehub.renaming.file.RenamingFileProcess;
import com.teamdev.filehub.renaming.folder.RenamingFolderProcess;
import com.teamdev.filehub.repository.AuthenticationDao;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.repository.UserDao;
import com.teamdev.filehub.savefile.SaveFileProcess;

public interface ApplicationContext {

    AuthenticationDao getAuthenticationDao();

    FileDao getFileDao();

    UserDao getUserDao();

    SaveFileProcess getSaveProcess();

    UserAuthenticationProcess getUserAuthenticationProcess();

    UserRegistrationProcess getUserRegistrationProcess();
    DownloadView getDownloadView();

}
