package com.teamdev.filehub.authenticateduser;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.Command;
import com.teamdev.filehub.record.RecordId;

/**
 * The {@link Command} extension with data about authenticated user.
 */
public abstract class AuthenticatedUserCommand implements Command {

    private final RecordId userId;

    protected AuthenticatedUserCommand(RecordId userId) {
        this.userId = Preconditions.checkNotNull(userId);
    }

    public RecordId userId() {
        return userId;
    }
}
