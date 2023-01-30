package com.teamdev.filehub.database.data;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;
import java.time.LocalDateTime;


/**
 * Holds all id of user and his token.
 */
public class UserTokensData extends Data {

    private final String token;

    private final LocalDateTime validity;

    @ParametersAreNonnullByDefault
    public UserTokensData(String id, String token, LocalDateTime validity) {
        super(id);

        Preconditions.checkNotNull(id);
        Preconditions.checkNotNull(token);
        Preconditions.checkNotNull(validity);

        this.token = token;

        this.validity = validity;
    }


    public String getToken() {
        return token;
    }

    public LocalDateTime getValidity() {
        return validity;
    }
}
