package com.teamdev.filehub.authenticateduser;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.Query;
import com.teamdev.filehub.record.RecordId;

/**
 * Extension with data about authenticated user.
 */
public abstract class AuthenticatedUserQuery implements Query {

    private final RecordId userId;

    protected AuthenticatedUserQuery(RecordId userId) {
        this.userId = Preconditions.checkNotNull(userId);
    }

    public RecordId userId() {
        return userId;
    }
}
