package com.teamdev.filehub.repository.dbconstants;

/**
 * The queries for work with user table in database.
 */
public class UserDaoConstants {


    public static String FROM_USERS = "select *from user;";

    public static String FROM_USERS_BY_ID = "select *from user where id like ?;";

    public static String FROM_USERS_BY_EMAIL = "select *from user where EMAIL like ?;";

    public static final String INSERT_INTO_USERS = "insert into user (id, email, password) values ( ?, ?, ?);";

    public static final String UPDATE_USERS = "UPDATE user\n" +
            "SET email = ?, password= ?\n" +
            "WHERE id = ?;";

    public static final String DELETE_PERSON_BY_ID = "DELETE FROM user WHERE id = ?";



}
