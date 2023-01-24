package com.teamdev.filehub.getdata.folder.content.search;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserQuery;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The query from the FileHub application for getting files and folders of a specific folder by item name.
 */
public class GetFolderContentByNameQuery extends AuthenticatedUserQuery {

    private final String folderId;
    private final String itemName;

    @ParametersAreNonnullByDefault
    public GetFolderContentByNameQuery(RecordId ownerId, String folderId, String itemName) {
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
