package com.teamdev.repository;

import com.google.common.flogger.FluentLogger;
import com.teamdev.database.DataBase;
import com.teamdev.database.userTokens.UserTokensData;
import com.teamdev.record.UserId;
import com.teamdev.record.UserTokensRecord;
import com.teamdev.util.ConstTimeZone;
import com.teamdev.util.DataBaseException;
import com.teamdev.util.QueryRequestException;

import javax.annotation.ParametersAreNonnullByDefault;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class AuthenticationDaoInMemory implements AuthenticationDao {

    private final DataBase dataBase;

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    public AuthenticationDaoInMemory(DataBase base) {
        this.dataBase = base;
    }


    /**
     * Read all records from userTokens table.
     *
     * @return list of user tokens.
     */
    @Override
    public List<UserTokensRecord> read() {

        List<UserTokensData> users = new ArrayList<>(
                dataBase
                        .getUsersAndTokens()
                        .getListOfObjects());

        List<UserTokensRecord> userRecords = new ArrayList<>();
        logger.atInfo().log("We read list of users: %s", userRecords);

        for (UserTokensData user : users) {
            userRecords.add(
                    new UserTokensRecord(
                            new UserId(user.getId()),
                            user.getToken(), user.getValidity()));
        }

        return userRecords;

    }

    /**
     * Searching {@link UserTokensRecord} by identifier.
     *
     * @param identifier email
     * @return {@link UserTokensRecord} by identifier.
     */
    @ParametersAreNonnullByDefault
    @Override
    public UserTokensRecord readById(String identifier) {

        if (!dataBase.getUsersAndTokens().containsId(identifier)) {

            return null;
        }

        Optional<UserTokensData> userTokensData1 = dataBase.getUsersAndTokens().readById(identifier);
        UserTokensData userTokensData = userTokensData1.get();

        UserTokensRecord userTokensRecord
                = new UserTokensRecord(
                new UserId(userTokensData.getId()),
                userTokensData.getToken(),
                userTokensData.getValidity());

        return userTokensRecord;
    }

    /**
     * Add new record of user tokens.
     * @param entity {@link UserTokensRecord} that try to add into list of users.
     */
    @ParametersAreNonnullByDefault
    @Override
    public void create(UserTokensRecord entity) throws QueryRequestException {

        UserTokensData userTokensData = new UserTokensData(
                entity.getId().getId(),
                entity.getToken(),
                entity.getValidity());

        try {
            dataBase.getUsersAndTokens().add(userTokensData);
        } catch (DataBaseException e) {
            throw new QueryRequestException(e.getMessage());
        }

    }

    /**
     * Update data of already exist record in list.
     * @param entity - updated record
     * @return updated object
     */
    @ParametersAreNonnullByDefault
    @Override
    public UserTokensRecord update(UserTokensRecord entity) {
        UserTokensData userTokensData = new UserTokensData(
                entity.getId().getId(),
                entity.getToken(),
                entity.getValidity());

        dataBase.getUsersAndTokens().update(userTokensData);

        return entity;
    }

    /**
     * Delete {@link UserTokensRecord}.
     * @param entity - object that try to delete
     * @return deleted object
     */
    @ParametersAreNonnullByDefault
    @Override
    public UserTokensRecord delete(UserTokensRecord entity) throws QueryRequestException {

        try {
            dataBase.getUsersAndTokens().delete(entity.getId().getId());
        } catch (DataBaseException e) {
            throw new QueryRequestException(e.getMessage());
        }

        return entity;
    }

    @Override
    public void delete(String id) throws QueryRequestException {
        try {
            dataBase.getUsersAndTokens().delete(id);
        } catch (DataBaseException e) {
            throw new QueryRequestException(e.getMessage());
        }

    }

    @Override
    public boolean checkToken(String id) {

        UserTokensRecord userTokensRecord = readById(id);

        if(userTokensRecord == null)
            return false;

        LocalDateTime validity = userTokensRecord.getValidity();

        boolean checkToken = validity.isAfter(LocalDateTime.now(ConstTimeZone.getTimeZone()));


        return checkToken;
    }



}
