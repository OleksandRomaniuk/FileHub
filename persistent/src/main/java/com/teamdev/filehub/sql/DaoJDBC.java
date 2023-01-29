package com.teamdev.filehub.sql;

import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.dbconstants.EscapeForLike;
import com.teamdev.filehub.dbconstants.UserDaoConstants;
import com.teamdev.filehub.record.Record;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.EntityDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.teamdev.filehub.sql.ConnectionJDBC.getConnection;

public abstract class DaoJDBC<E extends Record> implements EntityDao<E, RecordId> {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    @Override
    public List<E> findAll() {

        List<E> users = new ArrayList<>();

        try (Connection con = ConnectionJDBC.getConnection();

             Statement statement = con.createStatement();

             ResultSet resultSet = statement.executeQuery(UserDaoConstants.FROM_USERS)) {

            while (resultSet.next()) {

                users.add(mapObjects(resultSet));
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());
        }

        return users;
    }

    @Override
    public Optional<E> read(RecordId id) {

        List<E> users = new ArrayList<>();

        try (Connection con = ConnectionJDBC.getConnection();

             PreparedStatement stmt = con.prepareStatement(UserDaoConstants.USERS_BY_ID);) {

            int k = 1;

            stmt.setString(k++, "%" + EscapeForLike.escapeForLike(id.getId()) + "%");

            try (ResultSet rs = stmt.executeQuery();) {

                while (rs.next()) {

                    users.add(mapObjects(rs));
                }
            } catch (SQLException e) {
                throw e;
            }
        } catch (SQLException e) {

            logger.atInfo().log("SQLException: %s",  e.getMessage());

            throw new RuntimeException(e.getMessage());
        }
        return Optional.ofNullable(users.get(0));
    }

    @Override
    public void create(E entity) {
        Connection connection = null;

        PreparedStatement stmt = null;

        try {

            connection = ConnectionJDBC.getConnection();

            stmt = connection.prepareStatement(UserDaoConstants.INSERT_INTO_USERS);

            int k = 0;

            stmt.setString(++k, entity.getId().getId());

            int count = stmt.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();

            throw new RuntimeException(e.getMessage());
        } finally {

            close(connection);
            close(stmt);
        }
    }

    @Override
    public E update(E entity) {
        return null;
    }

    @Override
    public void delete(RecordId id) {
        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = ConnectionJDBC.getConnection();

            stmt = con.prepareStatement(UserDaoConstants.DELETE_USER_BY_ID);

            stmt.setString(1, id.getId());

        } catch (SQLException e) {

            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        } finally {
            close(con);
            close(stmt);
        }

    }

    private void close(AutoCloseable con) {
        if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    abstract E mapObjects(ResultSet rs) throws SQLException;
}
