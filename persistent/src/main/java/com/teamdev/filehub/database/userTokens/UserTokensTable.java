package com.teamdev.filehub.database.userTokens;

import com.teamdev.filehub.database.Table;
import com.teamdev.filehub.record.UserTokensRecord;
import com.teamdev.filehub.util.ConstTimeZone;

import java.time.LocalDateTime;

/**
 * {@code Table} for storing information about user tokens.
 */
public class UserTokensTable extends Table<UserTokensRecord> {

    public UserTokensTable() {
        super(UserTokensRecord[].class, "./src/main/resources/userTokens.json");
    }


    public boolean validateToken(String id){

        if (containsId(id)) {

            return getListOfObjects()
                    .stream()
                    .filter(user -> user.getId().getId().equals(id))
                    .anyMatch(user -> user.getValidity().isAfter(LocalDateTime.now(ConstTimeZone.getTimeZone())));

        }
        return false;
    }



}
