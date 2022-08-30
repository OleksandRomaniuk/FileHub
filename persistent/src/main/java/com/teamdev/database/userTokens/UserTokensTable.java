package com.teamdev.database.userTokens;

import com.teamdev.database.Table;
import com.teamdev.util.ConstTimeZone;

import java.time.LocalDateTime;

/**
 * {@code Table} for storing information about user tokens.
 */
public class UserTokensTable extends Table<UserTokensData> {

    public UserTokensTable() {
        super(UserTokensData[].class, "./src/main/resources/userTokens.json");
    }


    /**
     * Find tokens by id of user and checks if the token is valid.
     * @param id - email of user
     * @return checks if the token is valid
     */
    public boolean validateToken(String id){

        if (containsId(id)) {

            return getListOfObjects()
                    .stream()
                    .filter(user -> user.getId().equals(id))
                    .anyMatch(user -> user.getValidity().isAfter(LocalDateTime.now(ConstTimeZone.getTimeZone())));

        }
        return false;
    }



}