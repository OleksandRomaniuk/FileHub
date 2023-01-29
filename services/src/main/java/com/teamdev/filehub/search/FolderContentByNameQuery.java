package com.teamdev.filehub.search;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserQuery;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The query from application for getting files and folders by item name.
 */
public class FolderContentByNameQuery extends AuthenticatedUserQuery {

    private final String folderId;
    private final String itemName;

    @ParametersAreNonnullByDefault
    public FolderContentByNameQuery(RecordId ownerId, String folderId, String itemName) {
        super(ownerId);
        this.folderId = Preconditions.checkNotNull(folderId);
        this.itemName = Preconditions.checkNotNull(itemName);
    }

    public String getItemName() {
        return itemName;
    }

    public String getFolderId() {
        return folderId;
    }
}
