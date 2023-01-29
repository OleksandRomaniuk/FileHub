package com.teamdev.filehub.getdata.folder.content;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserQuery;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The query from application for getting files and folder in the current folder.
 */
public class FolderContentQuery extends AuthenticatedUserQuery {
    private final String folderId;

    @ParametersAreNonnullByDefault
    public FolderContentQuery(RecordId ownerId, String folderId) {
        super(ownerId);
        this.folderId = Preconditions.checkNotNull(folderId);
    }

    public String getFolderId() {
        return folderId;
    }
}
