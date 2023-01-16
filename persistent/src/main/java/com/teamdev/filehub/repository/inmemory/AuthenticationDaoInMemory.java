package com.teamdev.filehub.repository.inmemory;

import com.teamdev.filehub.database.DataBase;
import com.teamdev.filehub.database.userTokens.UserTokensTable;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserTokensRecord;
import com.teamdev.filehub.repository.AuthenticationDao;
import com.teamdev.filehub.util.ConstTimeZone;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Dao for authenticate user, and work with his token.
 */
public class AuthenticationDaoInMemory
        extends DaoInMemory<UserTokensRecord, UserTokensTable>
        implements AuthenticationDao {

    public AuthenticationDaoInMemory(DataBase base) {
        super(base.getUsersAndTokens());
    }

    @Override
    public boolean checkToken(RecordId id) {

        Optional<UserTokensRecord> userTokensRecord = this.read(id);

        if (userTokensRecord.isEmpty())
            return false;

        LocalDateTime validity = userTokensRecord.get().getValidity();

        return validity.isAfter(LocalDateTime.now(ConstTimeZone.getTimeZone()));
    }

    @Override
    public Optional<UserTokensRecord> findByToken(String token) {
        List<UserTokensRecord> tokens = this.findAll();

        if (tokens.size() ==0){
            return Optional.empty();
        }
        return tokens.stream().filter(item -> item.getToken().equals(token)).findFirst();
    }
}
