package com.teamdev.filehub.repository.sql;


import com.google.common.flogger.FluentLogger;

import com.teamdev.filehub.record.Email;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.repository.UserDao;
import com.teamdev.filehub.repository.dbconstants.UserDaoConstants;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.teamdev.filehub.repository.sql.ConnectionJDBC.getConnection;
import static com.teamdev.filehub.repository.sql.EscapeForLike.escapeForLike;

/**
 * The implementation of {@link UserDao} for data access objects
 * that work with {@link UserRecord} and written to the database.
 */
public class UserDaoInDB  implements UserDao {


    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    @Override
    public List<UserRecord> findAll() {

        List<UserRecord> users = new ArrayList<>();

        try (Connection con = getConnection();

             Statement stmt = con.createStatement();

             ResultSet rs = stmt.executeQuery(UserDaoConstants.FROM_USERS)) {

            while (rs.next()) {

                users.add(mapUser(rs));
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());
        }

        logger.atInfo().log("We read list of users: %s", users);

        return users;
    }

    @Override
    public Optional<UserRecord> read(RecordId identifier) {

        List<UserRecord> users = new ArrayList<>();

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(UserDaoConstants.FROM_USERS_BY_ID)) {

            stmt.setString(1, "%" + escapeForLike(identifier.getId()) + "%");

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    users.add(mapUser(rs));
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw e;
            }
        } catch (SQLException e) {

            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
        return Optional.of(users.get(0));
    }

    @Override
    public Optional<UserRecord> readByEmail(Email email) {

        List<UserRecord> users = new ArrayList<>();

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(UserDaoConstants.FROM_USERS_BY_EMAIL)) {

            stmt.setString(1, email.getEmail());

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    users.add(mapUser(rs));
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw e;
            }
        } catch (SQLException e) {

            e.printStackTrace();
            throw new RuntimeException(e.getMessage());

        }
        if(users.size()>0){
            return Optional.of(users.get(0));
        }
        return Optional.empty();
    }

    @Override
    public void create(UserRecord entity) {

        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(UserDaoConstants.INSERT_INTO_USERS);

            int k = 0;

            stmt.setString(++k, entity.getId().getId());
            stmt.setString(++k, entity.getEmail());
            stmt.setString(++k, entity.getPassword());

            int count = stmt.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();

            throw new RuntimeException(e.getMessage());
        } finally {

            close(con);
            close(stmt);
        }
    }

    @Override
    public UserRecord update(UserRecord entity) {

        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(UserDaoConstants.UPDATE_USERS);

            int k = 0;

            stmt.setString(++k, entity.getEmail());
            stmt.setString(++k, entity.getPassword());
            stmt.setString(++k, entity.getId().getId());

            stmt.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();

            throw new RuntimeException(e.getMessage());
        } finally {

            close(con);
            close(stmt);
        }
        return entity;
    }

    @Override
    public void delete(RecordId entity) {

        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(UserDaoConstants.DELETE_PERSON_BY_ID);

            stmt.setString(1, entity.getId());
            //int count = stmt.executeUpdate();
        } catch (SQLException e) {
            //log
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        } finally {
            close(con);
            close(stmt);
        }

    }


    private UserRecord mapUser(ResultSet rs) throws SQLException {

        UserRecord p = new UserRecord();
        p.setId(new RecordId(rs.getString("id")));
        p.setEmail(rs.getString("email"));
        p.setPassword(rs.getString("password"));

        return p;
    }


    private void close(AutoCloseable con) {
        if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
                logger.atInfo().log("During close connection catch Exception, %s", e.getMessage());
            }
        }
    }

}
