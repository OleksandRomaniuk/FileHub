package com.teamdev.filehub.database.file;

import com.teamdev.filehub.database.Table;
import com.teamdev.filehub.record.FileRecord;

/**
 * The implementation of {@link Table} for  information about file.
 */
public class FileTable extends Table<FileRecord> {

    public FileTable() {

        super(FileRecord[].class, "./src/main/resources/files.json");
    }
}
