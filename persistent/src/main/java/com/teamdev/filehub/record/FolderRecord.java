package com.teamdev.filehub.record;

import com.google.common.base.Preconditions;
/**
 * Holding metadata about folder.
 */
public class FolderRecord extends Record {

    private  String name;

    private String parentId;

    private  String ownerId;


    public FolderRecord(RecordId id, String name, String parentId, String ownerId) {
        super(id);
        this.name = name;
        Preconditions.checkNotNull(ownerId);
        this.parentId = parentId;
        this.ownerId = ownerId;
    }
    public FolderRecord(){
        super(new RecordId("gfsb"));
    }

    public FolderRecord(RecordId id, String name, String ownerId) {
        super(id);
        this.name = name;
        Preconditions.checkNotNull(ownerId);
        this.ownerId = ownerId;
    }

    public String getParentId() {
        return parentId;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }
}
