package com.teamdev.filehub.dto;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.FolderRecord;

/**
 * Data Transfer Object to represent data about file or folder.
 */
public class ItemInfo {
    private final String type;
    private final String id;
    private final String name;
    private final String parentId;
    private final String ownerId;
    private String mimetype = null;
    private String size = null;

    public ItemInfo(FolderRecord folderRecord) {

        Preconditions.checkNotNull(folderRecord);

        this.type = "folder";
        this.id = folderRecord.getId().getId();
        this.name = folderRecord.getName();
        this.parentId = folderRecord.getParentId();
        this.ownerId = folderRecord.getOwnerId();
    }

    public ItemInfo(FileRecord fileRecord) {

        Preconditions.checkNotNull(fileRecord);

        this.type = "file";
        this.id = fileRecord.getId().getId();
        this.name = fileRecord.getName();
        this.parentId = fileRecord.getParentFolderId();
        this.ownerId = fileRecord.getOwnerId();
        this.mimetype = fileRecord.getMimetype();
        this.size = fileRecord.getSize();
    }

    public String getType() {
        return type;
    }

    public String getId() {
        return id;
    }

    public String getMimetype() {
        return mimetype;
    }

    public String getName() {
        return name;
    }

    public String getSize() {
        return size;
    }

    public String getParentId() {
        return parentId;
    }

    public String getOwnerId() {
        return ownerId;
    }
}
