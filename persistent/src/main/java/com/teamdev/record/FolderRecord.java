package com.teamdev.record;

import com.google.common.base.Preconditions;

public class FolderRecord extends Record{

    private final String name;

    private String parentId; //id of parent folder

    private final String idOfOwner;


    public FolderRecord(UserId id, String name, String parentId, String idOfOwner) {
        super(id);
        this.name = name;
        Preconditions.checkNotNull(idOfOwner);
        this.parentId = parentId;
        this.idOfOwner = idOfOwner;
    }

    public FolderRecord(UserId id, String name, String idOfOwner) {
        super(id);
        this.name = name;
        Preconditions.checkNotNull(idOfOwner);
        this.idOfOwner = idOfOwner;
    }

    public String getParentId() {
        return parentId;
    }

    public String getIdOfOwner() {
        return idOfOwner;
    }

    public String getName() {
        return name;
    }
}
