package com.teamdev.filehub.repository;

import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserTokensRecord;

import java.util.List;
import java.util.Optional;

/**
 * Data access objects that work with token
 */
public interface AuthenticationDao extends EntityDao<UserTokensRecord, RecordId> {
    @Override
    List<UserTokensRecord> findAll();

    @Override
    Optional<UserTokensRecord> read(RecordId identifier) ;

    @Override
    void create(UserTokensRecord entity) ;

    @Override
    UserTokensRecord update(UserTokensRecord entity);

    @Override
    void delete(RecordId entity);

    boolean checkToken(RecordId id);

    Optional<UserTokensRecord> findByToken(String token) ;


}
