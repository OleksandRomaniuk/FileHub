package com.teamdev.filehub.database.data;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;


/**
 * Storing  information about user
 */
public class UserData extends Data {

    private final String email;

    private final String password;

    @ParametersAreNonnullByDefault
    public UserData(String id, String email, String password) {
        super(id);
        Preconditions.checkNotNull(id);
        Preconditions.checkNotNull(email);
        Preconditions.checkNotNull(password);

        this.email = email;

        this.password = password;
    }

    public String getEmail() {
        return email;
    }


    public String getPassword() {
        return password;
    }


}
