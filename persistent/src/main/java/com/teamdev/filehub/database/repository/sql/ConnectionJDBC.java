package com.teamdev.filehub.database.repository.sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * ConnectionJDBC is a class that provides JDBC connection to a relational database.
 * This class is responsible for handling the connection details and providing a connection to the database.
 */
public class ConnectionJDBC {

    private static final String URL = "jdbc:mysql://localhost:3306/FileHub";
    private static final String USER = "root";
    private static final String PASSWORD = "11017811";


    public static Connection getConnection(boolean autocommit) throws SQLException {

        Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);

        connection.setAutoCommit(autocommit);

        if (!autocommit) {

            connection.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
        }

        return connection;
    }

    public static Connection getConnection() throws SQLException {

        return getConnection(true);
    }
}
