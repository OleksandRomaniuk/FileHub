package com.teamdev.database;

import com.teamdev.database.file.FileTable;
import com.teamdev.database.folder.FolderTable;
import com.teamdev.database.user.UserTable;
import com.teamdev.database.userTokens.UserTokensTable;

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
