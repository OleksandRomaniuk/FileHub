package com.teamdev.filehub.database.record;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.Record;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;
import java.time.LocalDateTime;

/**
 * An implementation of {@link com.teamdev.filehub.record.Record} for holding metadata about user and his token.
 */

public class UserTokensRecord extends Record {

    private  String token;

    private  LocalDateTime validity;

    @ParametersAreNonnullByDefault
    public UserTokensRecord(com.teamdev.filehub.record.RecordId id, String token, LocalDateTime validity) {

        super(id);
        Preconditions.checkNotNull(token);
        Preconditions.checkNotNull(validity);

        this.token = token;

        this.validity = validity;
    }
    public UserTokensRecord(){
        super(new RecordId("0"));

    }

    public String getToken() {
        return token;
    }

    public LocalDateTime getValidity() {
        return validity;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setValidity(LocalDateTime validity) {
        this.validity = validity;
    }
}
