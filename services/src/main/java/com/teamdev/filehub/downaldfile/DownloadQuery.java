package com.teamdev.filehub.downaldfile;


import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserQuery;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The query from application for downloading file.
 */
public class DownloadQuery extends AuthenticatedUserQuery {

    private final String fileId;

    private final String idOfOwner;

    private String path;

    @ParametersAreNonnullByDefault
    public DownloadQuery(String fileId, String idOfOwner) {
        super(new RecordId(idOfOwner));

        this.fileId = Preconditions.checkNotNull(fileId);
        this.idOfOwner = Preconditions.checkNotNull(idOfOwner);
    }

    public DownloadQuery(String fileId, String idOfOwner, String path) {
        super(new RecordId(idOfOwner));

        this.fileId = Preconditions.checkNotNull(fileId);
        this.idOfOwner = Preconditions.checkNotNull(idOfOwner);
        this.path = Preconditions.checkNotNull(path);

    }

    public String getIdOfOwner() {
        return idOfOwner;
    }

    public String getFileId() {
        return fileId;
    }

    public String getPath() {
        return path;
    }
}
