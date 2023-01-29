package com.teamdev.filehub.logout;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.AuthenticationDao;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * Represents operation for deleting token.
 */
public class LogOutUserProcess implements LogOutProcess {

    private final AuthenticationDao dao;

    @ParametersAreNonnullByDefault
    public LogOutUserProcess(AuthenticationDao dao) {
        this.dao = Preconditions.checkNotNull(dao);
    }

    @Override
    public RecordId handle(LogOutCommand command) {

        dao.delete(command.userId());

        return command.userId();
    }
}
