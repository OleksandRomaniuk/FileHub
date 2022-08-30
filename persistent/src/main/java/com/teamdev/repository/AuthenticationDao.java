package com.teamdev.repository;

import com.teamdev.record.UserTokensRecord;
import com.teamdev.util.DataBaseException;
import com.teamdev.util.QueryRequestException;

import java.util.List;

/**
 * The interface for data access objects that work with a {@link UserTokensRecord}
 */
public interface AuthenticationDao extends EntityDao<UserTokensRecord, String> {
    @Override
    List<UserTokensRecord> read();

    @Override
    UserTokensRecord readById(String identifier) throws QueryRequestException;

    @Override
    void create(UserTokensRecord entity) throws QueryRequestException;

    @Override
    UserTokensRecord update(UserTokensRecord entity);

    @Override
    UserTokensRecord delete(UserTokensRecord entity) throws QueryRequestException;


    void delete(String id) throws DataBaseException, QueryRequestException;

    boolean checkToken(String id);

}
