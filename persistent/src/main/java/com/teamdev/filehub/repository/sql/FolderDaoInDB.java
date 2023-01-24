package com.teamdev.filehub.repository.sql;

import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.repository.dbconstants.FolderDaoConstants;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.teamdev.filehub.repository.sql.ConnectionJDBC.getConnection;
import static com.teamdev.filehub.repository.sql.EscapeForLike.escapeForLike;

public class FolderDaoInDB implements FolderDao {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    @Override
    public Optional<FolderRecord> read(RecordId identifier) {

        FolderRecord folderRecord = null;

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(FolderDaoConstants.FROM_FOLDER_BY_ID)) {

            stmt.setString(1, identifier.getId());

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    folderRecord = mapFolder(rs);
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());

        }
        return Optional.ofNullable(folderRecord);
    }

    @Override
    public void create(FolderRecord entity) {
        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(FolderDaoConstants.INSERT_INTO_FOLDER);

            int k = 0;

            stmt.setString(++k, entity.getId().getId());
            stmt.setString(++k, entity.getName());
            stmt.setString(++k, entity.getParentId());
            stmt.setString(++k, entity.getOwnerId());

            stmt.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();

            throw new RuntimeException(e.getMessage());
        } finally {

            close(con);
            close(stmt);
        }
    }

    @Override
    public FolderRecord update(FolderRecord entity) {
        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(FolderDaoConstants.UPDATE_FOLDER);

            int k = 0;

            stmt.setString(++k, entity.getName());
            stmt.setString(++k, entity.getParentId());
            stmt.setString(++k, entity.getOwnerId());

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

            stmt = con.prepareStatement(FolderDaoConstants.DELETE_FOLDER_BY_ID);

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
    public List<FolderRecord> findAll() {

        List<FolderRecord> fileRecords = new ArrayList<>();

        try (Connection con = getConnection();

             Statement stmt = con.createStatement();

             ResultSet rs = stmt.executeQuery(FolderDaoConstants.FROM_FOLDER)) {

            while (rs.next()) {

                fileRecords.add(mapFolder(rs));
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());
        }

        logger.atInfo().log("We read list of folders tokens: %s", fileRecords);

        return fileRecords;
    }

    @Override
    public void updateName(String id, String name) {
        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(FolderDaoConstants.UPDATE_NAME);

            int k = 0;

            stmt.setString(++k, name);
            stmt.setString(++k, id);
            stmt.executeUpdate();

        } catch (SQLException e) {

            e.printStackTrace();

            throw new RuntimeException(e.getMessage());
        } finally {

            close(con);
            close(stmt);
        }
    }

    @Override
    public boolean checkForFolderExistence(FolderRecord folder) {
        FolderRecord folderRecord = null;

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(FolderDaoConstants.FIND_FOLDER_BY_PARENT_AND_NAME)) {

            stmt.setString(1, folder.getParentId());
            stmt.setString(2, folder.getName());

            try (ResultSet rs = stmt.executeQuery()) {

                if (rs.next()) {

                    return true;
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());

        }
        return false;

    }

    @Override
    public List<FolderRecord> findFoldersByParent(String parentId) {

        List<FolderRecord> folders = new ArrayList<>();

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(FolderDaoConstants.FROM_FOLDER_BY_PARENT_ID)) {

            stmt.setString(1, parentId);

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    folders.add(mapFolder(rs));
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());

        }
        return folders;
    }

    @Override
    public FolderRecord findUserRootFolder(RecordId userId) {
        FolderRecord folderRecord = null;

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(FolderDaoConstants.FIND_USER_ROOT_FOLDER)) {

            stmt.setString(1, userId.getId());

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    folderRecord = mapFolder(rs);
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());

        }
        return folderRecord;
    }

    @Override
    public List<FolderRecord> findFilesByParentAndName(String parentId, String name) {

        List<FolderRecord> folders = new ArrayList<>();

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(FolderDaoConstants.FROM_FOLDER_BY_PARENT_ID_AND_NAME)) {

            stmt.setString(1, parentId);
            stmt.setString(2, "%" + escapeForLike(name) + "%");

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    folders.add(mapFolder(rs));
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());

        }
        return folders;
    }


    private FolderRecord mapFolder(ResultSet rs) throws SQLException {

        FolderRecord p = new FolderRecord();

        p.setId(new RecordId(rs.getString("id")));

        p.setName(rs.getString("name"));

        p.setParentId(rs.getString("parentId"));

        p.setOwnerId(rs.getString("ownerId"));

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
