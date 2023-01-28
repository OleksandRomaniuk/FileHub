package com.teamdev.filehub.repository.sql;

import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.record.Record;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.EntityDao;
import com.teamdev.filehub.repository.dbconstants.UserDaoConstants;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.teamdev.filehub.repository.sql.ConnectionJDBC.getConnection;
import static com.teamdev.filehub.repository.sql.EscapeForLike.escapeForLike;

public abstract class DaoJDBC<E extends Record> implements EntityDao<E, RecordId> {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    @Override
    public List<E> findAll() {

        List<E> users = new ArrayList<>();

        try (Connection con = getConnection();

             Statement stmt = con.createStatement();

             ResultSet rs = stmt.executeQuery(UserDaoConstants.FROM_USERS)) {

            while (rs.next()) {

                users.add(mapObjects(rs));
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());
        }

        logger.atInfo().log("We read list of objects: %s", users);

        return users;
    }

    @Override
    public Optional<E> read(RecordId id) {

        List<E> users = new ArrayList<>();

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(UserDaoConstants.FROM_USERS_BY_ID);) {

            int k = 1;

            stmt.setString(k++, "%" + escapeForLike(id.getId()) + "%");

            try (ResultSet rs = stmt.executeQuery();) {

                while (rs.next()) {

                    users.add(mapObjects(rs));
                }
            } catch (SQLException e) {

                logger.atInfo().log("SQLException: %s",  e.getMessage());

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
        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(UserDaoConstants.INSERT_INTO_USERS);

            int k = 0;

            stmt.setString(++k, entity.getId().getId());
            //stmt.setString(++k, entity.getEmail());
            //stmt.setString(++k, entity.getPassword());

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
    public E update(E entity) {
        return null;
    }

    @Override
    public void delete(RecordId id) {
        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(UserDaoConstants.DELETE_PERSON_BY_ID);

            stmt.setString(1, id.getId());
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
