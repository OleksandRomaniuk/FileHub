package com.teamdev.filehub.repository.sql;

import com.google.common.truth.Truth;
import org.junit.jupiter.api.Test;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDbctest {

    private static final String URL = "jdbc:mysql://localhost:3306/FileHub";
    private static final String USER = "root";
    private static final String PASSWORD = "root";


    @Test
    public void jdbcall() throws ClassNotFoundException, SQLException {

        Class.forName ("com.mysql.jdbc.Driver");

        Connection conn = DriverManager.getConnection (URL, USER, PASSWORD);
        System.out.println ();
        System.out.println(conn);
        Truth.assertThat(conn).isNotNull();

    }

}
