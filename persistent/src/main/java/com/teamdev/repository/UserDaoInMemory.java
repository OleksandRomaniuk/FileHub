package com.teamdev.repository;


import com.google.common.base.Preconditions;
import com.google.common.flogger.FluentLogger;
import com.teamdev.database.DataBase;
import com.teamdev.database.user.UserData;
import com.teamdev.record.UserId;
import com.teamdev.record.UserRecord;
import com.teamdev.util.DataBaseException;
import com.teamdev.util.QueryRequestException;
import com.teamdev.util.ValidationException;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * The implementation of UserDao for data access objects that work with {@link UserData}.
 */
public class UserDaoInMemory implements UserDao {

    private final DataBase dataBase;

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    public UserDaoInMemory(DataBase base) {
        this.dataBase = base;
    }

    /**
     * Read all records from user table.
     * @return all users from database
     */
    @Override
    public List<UserRecord> read() {

        List<UserData> users = new ArrayList<>(dataBase.getUsers().getListOfObjects());

        List<UserRecord> userRecords = new ArrayList<>();

        for (UserData user : users) {
            userRecords.add(new UserRecord(
                    new UserId(user.getId()),
                    user.getEmail(),
                    user.getPassword()));
        }

        logger.atInfo().log("We read list of users: %s",userRecords );


        return userRecords;
    }

    /**
     * Looking for a user by id.
     *
     * @param identifier id for searching
     * @return found {@link UserRecord}
     * @throws ValidationException - if user with such id don't exist
     */
    @ParametersAreNonnullByDefault
    @Override
    public UserRecord readById(String identifier) throws QueryRequestException {

        Preconditions.checkNotNull(identifier);

        Optional<UserData> user = dataBase.getUsers().readById(identifier);

        if (user.isPresent()) {

            UserData userData = user.get();

            logger.atInfo().log("We read user by id %s: %s", identifier,  userData);

            return new UserRecord(
                    new UserId(userData.getId()),
                    userData.getEmail(),
                    userData.getPassword());

        }
        else {

            throw new QueryRequestException("User with such id don't exist: " + identifier );
        }
    }

    /**
     * Looking for a user by email.
     *
     * @param email email for searching
     * @return found {@link UserRecord}
     * @throws ValidationException - if user with such email don't exist
     */
    @Override
    public UserRecord readByEmail(String email) throws QueryRequestException {

        Optional<UserData> user = dataBase.getUsers().findByEmail(email);

        if(user.isPresent()){

            UserData userData = user.get();

            logger.atInfo().log("We read user by email %s: %s", email,  userData);

            return new UserRecord(
                    new UserId(userData.getId()),
                    userData.getEmail(),
                    userData.getPassword());
        }
        else {
            throw new QueryRequestException("User with such email don't exist: " + email );
        }
    }

    /**
     * Add new user into the database.
     * @param entity - new object of user
     * @throws QueryRequestException - if such user already exist
     */
    @ParametersAreNonnullByDefault
    @Override
    public void create(UserRecord entity) throws QueryRequestException {

        UserData user = new UserData(entity.getId().getId(), entity.getEmail(), entity.getPassword());

        try {

            dataBase.getUsers().add(user);

            logger.atInfo().log("We add new user: %s", user);

        } catch (DataBaseException e) {
            throw new QueryRequestException(e.getMessage());
        }

    }


    /**
     * In the event of a change in the user's personal data,
     * update the data in the system.
     *
     * @param entity - updated object
     * @return updated {@link UserRecord}
     */
    @ParametersAreNonnullByDefault
    @Override
    public UserRecord update(UserRecord entity) {

        UserData user = new UserData(entity.getId().getId(), entity.getEmail(), entity.getPassword());

        dataBase.getUsers().update(user);

        logger.atInfo().log("Update user with follow data: %s", user);

        return entity;
    }

    /**
     * Delete user.
     *
     * @param entity
     * @return deleted user
     */
    @ParametersAreNonnullByDefault
    @Override
    public UserRecord delete(UserRecord entity) throws QueryRequestException {

        try {

            dataBase.getUsers().delete(entity.getEmail());

            logger.atInfo().log("Delete user : %s", entity);

        } catch (DataBaseException e) {
            throw new QueryRequestException(e.getMessage());
        }

        return entity;

    }


}
