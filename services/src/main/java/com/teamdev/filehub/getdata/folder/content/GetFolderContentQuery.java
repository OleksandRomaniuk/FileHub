package com.teamdev.filehub.getdata.folder.content;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserQuery;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The query from FileHub application for get files and folder in the current folder.
 */
public class GetFolderContentQuery extends AuthenticatedUserQuery {
    private final String folderId;

    @ParametersAreNonnullByDefault
    public GetFolderContentQuery(RecordId ownerId, String folderId) {
        super(ownerId);
        this.folderId = Preconditions.checkNotNull(folderId);
    }

    public String getFolderId() {
        return folderId;
    }
}
