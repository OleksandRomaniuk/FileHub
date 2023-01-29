package com.teamdev.filehub.repository.sql;


import com.google.common.flogger.FluentLogger;

import com.teamdev.filehub.record.Email;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.repository.UserDao;
import com.teamdev.filehub.repository.dbconstants.UserDaoConstants;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.teamdev.filehub.repository.sql.ConnectionJDBC.getConnection;
import static com.teamdev.filehub.repository.dbconstants.EscapeForLike.escapeForLike;

/**
 * The implementation of {@link UserDao} for data access objects
 * that work with {@link UserRecord} and written to the database.
 */
public class UserDaoInDB  implements UserDao {


    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    @Override
    public List<UserRecord> findAll() {

        List<UserRecord> users = new ArrayList<>();

        try (Connection connection = getConnection();

             Statement stmt = connection.createStatement();

             ResultSet resultSet = stmt.executeQuery(UserDaoConstants.FROM_USERS)) {

            while (resultSet.next()) {

                users.add(mapUser(resultSet));
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());
        }

        return users;
    }

    @Override
    public Optional<UserRecord> read(RecordId identifier) {

        List<UserRecord> users = new ArrayList<>();

        try (Connection connection = getConnection();

             PreparedStatement statement = connection.prepareStatement(UserDaoConstants.FROM_USERS_BY_ID)) {

            statement.setString(1, "%" + escapeForLike(identifier.getId()) + "%");

            try (ResultSet rs = statement.executeQuery()) {

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

        try (Connection connection = getConnection();

             PreparedStatement stmt = connection.prepareStatement(UserDaoConstants.FROM_USERS_BY_EMAIL)) {

            stmt.setString(1, email.getEmail());

            try (ResultSet resultSet = stmt.executeQuery()) {

                while (resultSet.next()) {

                    users.add(mapUser(resultSet));
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

        Connection connection = null;

        PreparedStatement statement = null;

        try {

            connection = getConnection();

            statement = connection.prepareStatement(UserDaoConstants.INSERT_INTO_USERS);

            int k = 0;

            statement.setString(++k, entity.getId().getId());
            statement.setString(++k, entity.getEmail());
            statement.setString(++k, entity.getPassword());

            int count = statement.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();

            throw new RuntimeException(e.getMessage());
        } finally {

            close(connection);
            close(statement);
        }
    }

    @Override
    public UserRecord update(UserRecord entity) {

        Connection connection = null;

        PreparedStatement statement = null;

        try {

            connection = getConnection();

            statement = connection.prepareStatement(UserDaoConstants.UPDATE_USERS);

            int k = 0;

            statement.setString(++k, entity.getEmail());
            statement.setString(++k, entity.getPassword());
            statement.setString(++k, entity.getId().getId());

            statement.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();

            throw new RuntimeException(e.getMessage());
        } finally {

            close(connection);
            close(statement);
        }
        return entity;
    }

    @Override
    public void delete(RecordId entity) {

        Connection connection = null;

        PreparedStatement statement = null;

        try {

            connection = getConnection();

            statement = connection.prepareStatement(UserDaoConstants.DELETE_PERSON_BY_ID);

            statement.setString(1, entity.getId());

        } catch (SQLException e) {
            //log
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        } finally {
            close(connection);
            close(statement);
        }

    }


    private UserRecord mapUser(ResultSet rs) throws SQLException {

        UserRecord p = new UserRecord();
        p.setId(new RecordId(rs.getString("id")));
        p.setEmail(rs.getString("email"));
        p.setPassword(rs.getString("password"));

        return p;
    }


    private void close(AutoCloseable connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (Exception e) {
                logger.atInfo().log("During close connection catch Exception, %s", e.getMessage());
            }
        }
    }

}
