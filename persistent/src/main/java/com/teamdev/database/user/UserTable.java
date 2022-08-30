package com.teamdev.database.user;

import com.teamdev.database.Table;

import java.util.Optional;

/**
 * The implementation of {@link Table} for storing information about users.
 */
public class UserTable extends Table<UserData> {

    public UserTable() {
        super(UserData[].class, "./src/main/resources/users.json");

    }
    public Optional<UserData> findByEmail(String email){

        return listOfObjects.stream().filter(userData -> userData.getEmail().equals(email)).findFirst();
    }

}
