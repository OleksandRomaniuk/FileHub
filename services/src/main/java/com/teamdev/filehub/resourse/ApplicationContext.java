package com.teamdev.filehub.resourse;

import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import com.teamdev.filehub.registration.UserRegistrationProcess;
import com.teamdev.filehub.repository.AuthenticationDao;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.repository.UserDao;

public interface ApplicationContext {

    AuthenticationDao getAuthenticationDao();

    FileDao getFileDao();

    UserDao getUserDao();



    UserAuthenticationProcess getUserAuthenticationProcess();

    UserRegistrationProcess getUserRegistrationProcess();


}
