package com.teamdev.filehub.database.table;

import com.teamdev.filehub.database.Table;
import com.teamdev.filehub.record.FileRecord;

/**
 * Storing information about file.
 */
public class FileTable extends Table<FileRecord> {

    public FileTable() {

        super(FileRecord[].class, "./src/main/resources/files.json");
    }
}
