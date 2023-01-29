package com.teamdev.filehub.dbconstants;
/**
 * The queries for work with files table in database.
 */
public class FileDaoConstants {
    public static String FROM_FILES_BY_PARENT_ID_AND_NAME = "select * from files where parentId = ? and name like ?;";

    public static final String INSERT_INTO_FILES
            = "insert into files (id, name, size, mimetype, parentId, ownerId) values ( ?, ?, ?, ?, ?, ?);";

    public static final String UPDATE_FILES = "UPDATE files\n" +
            "SET name = ?, size= ?, mimetype = ?, parentId = ?, ownerId = ? \n" +
            "WHERE id = ?;";

    public static final String UPDATE_NAME = "UPDATE files SET name = ? WHERE id = ?;";

    public static String FROM_FILES = "select *from files;";

    public static String FROM_FILES_BY_ID = "select *from files where id like ?;";

    public static String FROM_FILES_BY_PARENT_ID = "select * from files where parentId = ?;";

    public static final String DELETE_FILES_BY_ID = "DELETE FROM files WHERE id = ?";




}
