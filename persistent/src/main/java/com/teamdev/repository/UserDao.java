package com.teamdev.repository;


import com.teamdev.database.user.UserData;
import com.teamdev.record.UserRecord;
import com.teamdev.util.QueryRequestException;

import java.util.List;

/**
 * The interface for data access objects that work with a {@link UserData}
 */
public interface UserDao extends EntityDao<UserRecord, String> {
    @Override
    List<UserRecord> read();

    @Override
    UserRecord readById(String identifier) throws QueryRequestException;

    UserRecord readByEmail(String email) throws QueryRequestException;

    @Override
    void create(UserRecord entity) throws QueryRequestException;

    @Override
    UserRecord update(UserRecord entity);

    @Override
    UserRecord delete(UserRecord entity) throws QueryRequestException;
}
