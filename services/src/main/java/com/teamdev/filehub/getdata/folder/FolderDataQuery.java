package com.teamdev.filehub.getdata.folder;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserQuery;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The query from FileHub application for get data about folder by id.
 */
public class FolderDataQuery extends AuthenticatedUserQuery {
    private final String folderId;

    @ParametersAreNonnullByDefault
    public FolderDataQuery(RecordId ownerId, String folderId) {
        super(ownerId);
        this.folderId = Preconditions.checkNotNull(folderId);
    }

    public String getFolderId() {
        return folderId;
    }
}
