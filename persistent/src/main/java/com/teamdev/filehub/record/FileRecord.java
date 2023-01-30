package com.teamdev.filehub.record;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * Holding metadata about file.
 */
public class FileRecord extends Record {

    private  String name;

    private  String size;

    private  String mimetype;

    private  String ownerId;

    private  String parentFolderId;


    @ParametersAreNonnullByDefault
    public FileRecord(RecordId id,
                      String name,
                      String size,
                      String mimetype,
                      String idOfOwner,
                      String idOfParentFolder) {
        super(id);

        Preconditions.checkNotNull(name);
        Preconditions.checkNotNull(size);
        Preconditions.checkNotNull(mimetype);
        Preconditions.checkNotNull(idOfOwner);
        Preconditions.checkNotNull(idOfParentFolder);

        this.name = name;
        this.size = size;
        this.mimetype = mimetype;
        this.ownerId = idOfOwner;
        this.parentFolderId = idOfParentFolder;
    }
    public FileRecord(){
        super(new RecordId("vfsx"));
    }

    public String getOwnerId() {
        return ownerId;
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

    public String getParentFolderId() {
        return parentFolderId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setMimetype(String mimetype) {
        this.mimetype = mimetype;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public void setParentFolderId(String parentFolderId) {
        this.parentFolderId = parentFolderId;
    }
}
