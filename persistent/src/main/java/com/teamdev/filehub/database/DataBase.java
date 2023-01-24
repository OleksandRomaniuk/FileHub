package com.teamdev.filehub.database;

import com.teamdev.filehub.database.file.FileTable;
import com.teamdev.filehub.database.folder.FolderTable;
import com.teamdev.filehub.database.user.UserTable;
import com.teamdev.filehub.database.userTokens.UserTokensTable;

/**
 * DataBase for storing tables.
 */
public class DataBase {

    UserTable users = new UserTable();

    UserTokensTable usersAndTokens = new UserTokensTable();

    FileTable fileTable = new FileTable();

    FolderTable folderTable = new FolderTable();

    public UserTable getUsers() {
        return users;
    }

    public UserTokensTable getUsersAndTokens() {
        return usersAndTokens;
    }

    public FileTable getFileTable() {
        return fileTable;
    }

    public FolderTable getFolderTable() {
        return folderTable;
    }
}
