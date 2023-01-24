package com.teamdev.filehub.database.folder;

import com.teamdev.filehub.database.Table;
import com.teamdev.filehub.record.FolderRecord;

/**
 * The implementation of {@link Table} for storing information about folder.
 */
public class FolderTable extends Table<FolderRecord> {

    public FolderTable() {
        super(FolderRecord[].class, "./src/main/resources/folder.json");
    }
}
