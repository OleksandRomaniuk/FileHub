package com.teamdev.filehub.database.repository.dbconstants;
/**
 * The queries for work with folder table in database.
 */
public class FolderDaoConstants {

    public static String FROM_FOLDER = "select * from folder;";

    public static String FROM_FOLDER_BY_ID = "select *from folder where id = ?;";

    public static String FROM_FOLDER_BY_PARENT_ID = "select *from folder where parentId = ?;";

    public static String FROM_FOLDER_BY_PARENT_ID_AND_NAME = "select *from folder where parentId = ? and name like ?;";

    public static final String INSERT_INTO_FOLDER
            = "insert into folder (id, name, parentId, ownerId) values ( ?, ?, ?, ?);";

    public static final String UPDATE_FOLDER = """
            UPDATE folder
            SET name = ?, parentId = ?, ownerId = ?
            WHERE id = ?;""";

    public static final String UPDATE_NAME = "UPDATE folder SET name = ? WHERE id = ?;";

    public static final String DELETE_FOLDER_BY_ID = "DELETE FROM folder WHERE id = ?";

    public static final String FIND_USER_ROOT_FOLDER = "select * from folder where ownerId = ? and parentId is null;";

    public static final String FIND_FOLDER_BY_PARENT_AND_NAME = "select * from folder where parentId = ? and name = ?;";

}
