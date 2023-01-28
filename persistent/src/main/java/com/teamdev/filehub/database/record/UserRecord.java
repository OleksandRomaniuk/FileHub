package com.teamdev.filehub.database.record;


import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.Email;
import com.teamdev.filehub.record.Record;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;


/**
 * An implementation of {@link Record} for holding metadata about user with encrypted password.
 */
public class UserRecord extends Record {

    private Email email;

    private String password;

    @ParametersAreNonnullByDefault
    public UserRecord(RecordId id, String email, String password) {

        super(id);

        Preconditions.checkNotNull(email);

        Preconditions.checkNotNull(password);

        this.email = new Email(email);

        this.password = password;
    }
    public UserRecord() {

        super(new RecordId("0"));
    }

    public String getEmail() {
        return email.getEmail();
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

    public void setEmail(String email) {
        this.email = new Email(email);
    }
}
