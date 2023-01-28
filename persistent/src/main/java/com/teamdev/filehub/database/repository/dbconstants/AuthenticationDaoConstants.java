package com.teamdev.filehub.database.repository.dbconstants;

/**
 * The queries for work with userToken table in database.
 */
public class AuthenticationDaoConstants {

    public static String FROM_USER_TOKEN = "select *from userTokens;";

    public static String FROM_USER_TOKEN_BY_ID = "select *from userTokens where user_id = ?;";

    public static String FROM_USER_TOKEN_BY_TOKEN = "select *from userTokens where token = ?;";

    public static final String INSERT_INTO_USER_TOKEN
            = "insert into userTokens (user_id, token, validity) values ( ?, ?, ?);";

    public static final String UPDATE_USER_TOKEN = """
            UPDATE userTokens
            SET token = ?, validity= ?
            WHERE user_id = ?;""";

    public static final String DELETE_USER_TOKEN_BY_ID = "DELETE FROM userTokens WHERE user_id = ?";
}
