package com.teamdev.filehub.uploadfile;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserCommand;
import com.teamdev.filehub.record.RecordId;

import java.io.InputStream;

/**
 * This is the user's intention to save file from the FileHub application.
 */
public class SaveFileCommand extends AuthenticatedUserCommand {

    private final InputStream inputStream;

    private final String name;

    private final String size;

    private final String mimetype;

    private final String ownerId;

    private final String parentFolderId;

    private String path;


    public SaveFileCommand(InputStream inputStream,
                           String name,
                           String size,
                           String mimetype,
                           String idOfOwner,
                           String idOfParentFolder) {

        super(new RecordId(idOfOwner));

        this.inputStream = Preconditions.checkNotNull(inputStream);
        this.name = Preconditions.checkNotNull(name);
        this.size = Preconditions.checkNotNull(size);
        this.mimetype = Preconditions.checkNotNull(mimetype);
        this.ownerId = Preconditions.checkNotNull(idOfOwner);
        this.parentFolderId = Preconditions.checkNotNull(idOfParentFolder);
    }


    public InputStream getInputStream() {
        return inputStream;
    }

    public String getName() {
        return name;
    }


    public String getSize() {
        return size;
    }

    public String getMimetype() {
        return mimetype;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public String getParentFolderId() {
        return parentFolderId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
