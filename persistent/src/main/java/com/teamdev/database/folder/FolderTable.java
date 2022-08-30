package com.teamdev.database.folder;

import com.teamdev.database.Table;
/**
 * The implementation of {@link Table} for storing information about folder.
 */
public class FolderTable extends Table<FolderData> {

    public FolderTable() {
        super(FolderData[].class, "./src/main/resources/folder.json");
    }
}
