package com.teamdev.filehub.database.user;

import com.teamdev.filehub.database.Table;
import com.teamdev.filehub.record.UserRecord;

import java.util.Optional;

/**
 * The implementation of {@link Table} for storing information about users.
 */
public class UserTable extends Table<UserRecord> {

    public UserTable() {
        super(UserRecord[].class, "./src/main/resources/users.json");

    }
    public Optional<UserRecord> findByEmail(String email){

        synchronized (lock) {

            return listOfObjects.stream().filter(userData -> userData.getEmail().equals(email)).findFirst();
        }
    }

}
