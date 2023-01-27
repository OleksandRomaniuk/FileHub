package com.teamdev.filehub.database.repository;


import com.teamdev.filehub.record.Email;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.repository.EntityDao;

import java.util.List;
import java.util.Optional;

/**
 * The interface for user data access objects that work with a {@link UserRecord}
 */
public interface UserDao extends EntityDao<UserRecord, RecordId> {

    @Override
    List<UserRecord> findAll();

    @Override
    Optional<UserRecord> read(RecordId id);

    Optional<UserRecord> readByEmail(Email email);

    @Override
    void create(UserRecord entity);

    @Override
    UserRecord update(UserRecord entity);

    @Override
    void delete(RecordId id);

}
