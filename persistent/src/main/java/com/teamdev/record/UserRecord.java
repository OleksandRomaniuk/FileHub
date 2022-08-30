package com.teamdev.record;


import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;


/**
 * An implementation of {@link Record} for holding main data about user with encrypted password.
 */
public class UserRecord extends Record {

    private String email;

    private String password;

    @ParametersAreNonnullByDefault
    public UserRecord(UserId id, String email, String password) {

        super(id);

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


    @Override
    public String toString() {
        return "UserRecord{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
