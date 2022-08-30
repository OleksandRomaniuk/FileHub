package com.teamdev.record;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;
import java.time.LocalDateTime;

/**
 * An implementation of {@link Record} for holding main data about user and his token.
 */

public class UserTokensRecord extends Record {

    private final String token;

    private final LocalDateTime validity;

    @ParametersAreNonnullByDefault
    public UserTokensRecord(UserId id, String token, LocalDateTime validity) {

        super(id);
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
