package com.teamdev.filehub.inmemory;


import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.database.DataBase;
import com.teamdev.filehub.database.table.UserTable;
import com.teamdev.filehub.record.Email;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.repository.UserDao;

import java.util.Optional;

/**
 *  Data access objects that work with {@link UserRecord}.
 */
public class UserDaoInMemory extends DaoInMemory<UserRecord, UserTable> implements UserDao {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    public UserDaoInMemory(DataBase dataBase) {
        super(dataBase.getUsers());
    }

    /**
     * Looking for a user by email.
     */
    @Override
    public Optional<UserRecord> readByEmail(Email email) {

        logger.atInfo().log("We find user by email: %s", email.getEmail());

        return table.findByEmail(email.getEmail());
    }

}
