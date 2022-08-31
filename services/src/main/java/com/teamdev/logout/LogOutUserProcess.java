package com.teamdev.logout;

import com.teamdev.repository.AuthenticationDao;
import com.teamdev.resourse.ApplicationContext;
import com.teamdev.util.DataBaseException;
import com.teamdev.util.ProcessException;
import com.teamdev.util.QueryRequestException;

/**
 * The implementation of {@link LogOutProcess} for handling {@link LogOutCommand}
 * and delete user token.
 */
public class LogOutUserProcess implements LogOutProcess {

    private final AuthenticationDao dao;

    public LogOutUserProcess(ApplicationContext context) {
        this.dao = context.getAuthenticationDao();
    }


    @Override
    public String handle(LogOutCommand command) throws ProcessException {

        String id = command.getId();

        if(dao.checkToken(id)){

            try {
                dao.delete(id);
            } catch (DataBaseException | QueryRequestException e) {
               throw new ProcessException(e.getMessage());
            }
            return id;
        }


        return "You have to log in.";
    }
}
