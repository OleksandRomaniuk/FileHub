package com.teamdev.filehub.database.table;

import com.teamdev.filehub.database.Table;
import com.teamdev.filehub.record.FolderRecord;

/**
 * Storing information about folder.
 */
public class FolderTable extends Table<FolderRecord> {

    public FolderTable() {
        super(FolderRecord[].class, "./src/main/resources/folder.json");
    }
}
