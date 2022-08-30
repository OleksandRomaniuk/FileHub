package com.teamdev.database.folder;

import com.teamdev.database.Data;
/**
 * {@code FolderData} holds all information about folder for database.
 */
public class FolderData extends Data {

    private final String name;

    private String parentId;

    private final String idOfOwner;

    public FolderData(String id, String name, String parentId, String idOfOwner) {
        super(id);
        this.name = name;
        this.parentId = parentId;
        this.idOfOwner = idOfOwner;
    }

    public FolderData(String id, String name, String idOfOwner) {
        super(id);
        this.name = name;
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
