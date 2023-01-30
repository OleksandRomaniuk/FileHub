package com.teamdev.filehub.delete;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserCommand;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * Deleting data
 */
public class DeleteItemCommand extends AuthenticatedUserCommand {

    private final String itemId;

    @ParametersAreNonnullByDefault
    public DeleteItemCommand(RecordId userId, String itemId) {
        super(userId);
        this.itemId = Preconditions.checkNotNull(itemId);
    }

    public String getItemId() {
        return itemId;
    }
}
