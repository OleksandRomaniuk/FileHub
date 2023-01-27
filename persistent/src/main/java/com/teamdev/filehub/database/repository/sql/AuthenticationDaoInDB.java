package com.teamdev.filehub.database.repository.sql;

import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserTokensRecord;
import com.teamdev.filehub.repository.AuthenticationDao;
import com.teamdev.filehub.repository.dbconstants.AuthenticationDaoConstants;
import com.teamdev.filehub.util.ConstTimeZone;

import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.teamdev.filehub.repository.sql.ConnectionJDBC.getConnection;

/**
 * The implementation of {@link AuthenticationDao} for data access objects
 * that work with {@link UserTokensRecord} and written to the database.
 */
public class AuthenticationDaoInDB implements AuthenticationDao {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    @Override
    public List<UserTokensRecord> findAll() {

        List<UserTokensRecord> tokensRecords = new ArrayList<>();

        try (Connection con = getConnection();

             Statement stmt = con.createStatement();

             ResultSet rs = stmt.executeQuery(AuthenticationDaoConstants.FROM_USER_TOKEN)) {

            while (rs.next()) {

                tokensRecords.add(mapUserToken(rs));
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());
        }

        logger.atInfo().log("We read list of user tokens: %s", tokensRecords);

        return tokensRecords;
    }

    @Override
    public Optional<UserTokensRecord> read(RecordId identifier) {

        UserTokensRecord user = null;

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(AuthenticationDaoConstants.FROM_USER_TOKEN_BY_ID)) {

            stmt.setString(1, identifier.getId());

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    user = mapUserToken(rs);
                }
            }
        } catch (SQLException e) {
            logger.atInfo().log("RuntimeException: %s", e.getMessage());

            throw new RuntimeException(e.getMessage());

        }
        return Optional.ofNullable(user);
    }

    @Override
    public void create(UserTokensRecord entity) {

        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(AuthenticationDaoConstants.INSERT_INTO_USER_TOKEN);

            int k = 0;

            logger.atInfo().log("create getValidity: %s", entity.getValidity());

            stmt.setString(++k, entity.getId().getId());
            stmt.setString(++k, entity.getToken());
            stmt.setString(++k, String.valueOf(entity.getValidity())); //todo исправить

            stmt.executeUpdate();

        } catch (SQLException e) {

            logger.atInfo().log("SQLException: %s", e.getMessage());

            throw new RuntimeException(e.getMessage());
        } finally {

            close(con);
            close(stmt);
        }
    }

    @Override
    public UserTokensRecord update(UserTokensRecord entity) {
        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(AuthenticationDaoConstants.UPDATE_USER_TOKEN);

            int k = 0;

            stmt.setString(++k, entity.getToken());
            stmt.setString(++k, String.valueOf(entity.getValidity()));
            stmt.setString(++k, entity.getId().getId());

            stmt.executeUpdate();

        } catch (SQLException e) {

            logger.atInfo().log("SQLException: %s", e.getMessage());

            throw new RuntimeException(e.getMessage());
        } finally {

            close(con);
            close(stmt);
        }
        return entity;
    }

    @Override
    public void delete(RecordId id) {

        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(AuthenticationDaoConstants.DELETE_USER_TOKEN_BY_ID);

            stmt.setString(1, id.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {

            logger.atInfo().log("SQLException: %s", e.getMessage());

            throw new RuntimeException(e.getMessage());
        } finally {
            close(con);
            close(stmt);
        }

    }

    @Override
    public boolean checkToken(RecordId id) {

        Optional<UserTokensRecord> userTokensRecord = read(id);

        if (userTokensRecord.isEmpty()){
            return false;
        }

        LocalDateTime validity = userTokensRecord.get().getValidity();

        return validity.isAfter(LocalDateTime.now(ConstTimeZone.getTimeZone()));
    }

    @Override
    public Optional<UserTokensRecord> findByToken(String token) {

        UserTokensRecord user = null;

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(AuthenticationDaoConstants.FROM_USER_TOKEN_BY_TOKEN)) {

            stmt.setString(1, token);

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    user = mapUserToken(rs);
                }
            }
        } catch (SQLException e) {
            logger.atInfo().log("RuntimeException: %s", e.getMessage());

            throw new RuntimeException(e.getMessage());

        }
        return Optional.ofNullable(user);
    }

    private UserTokensRecord mapUserToken(ResultSet rs) throws SQLException {

        UserTokensRecord p = new UserTokensRecord();

        p.setId(new RecordId(rs.getString("user_id")));
        p.setToken(rs.getString("token"));
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime
                = LocalDateTime.parse(rs.getString("validity"), format);//интерестно сработает ли
        p.setValidity(dateTime);

        return p;
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
}
