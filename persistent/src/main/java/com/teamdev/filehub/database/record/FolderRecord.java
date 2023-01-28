package com.teamdev.filehub.database.record;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.Record;
import com.teamdev.filehub.record.RecordId;

/**
 * An implementation of {@link Record} for holding metadata about folder.
 */
public class FolderRecord extends Record {

    private  String name;

    private String parentId; //id of parent folder

    private  String ownerId;


    public FolderRecord(RecordId id, String name, String parentId, String ownerId) {
        super(id);
        this.name = name;
        Preconditions.checkNotNull(ownerId);
        this.parentId = parentId;
        this.ownerId = ownerId;
    }
    public FolderRecord(){
        super(new com.teamdev.filehub.record.RecordId("gfsb"));
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
