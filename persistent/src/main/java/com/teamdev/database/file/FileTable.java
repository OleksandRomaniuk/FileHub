package com.teamdev.database.file;

import com.teamdev.database.Table;
/**
 * The implementation of {@link Table} for storing information about file.
 */
public class FileTable extends Table<FileData> {

    public FileTable() {

        super(FileData[].class, "./src/main/resources/files.json");
    }
}
