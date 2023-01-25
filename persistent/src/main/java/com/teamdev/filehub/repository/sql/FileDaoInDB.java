package com.teamdev.filehub.repository.sql;

import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FileDao;

import com.teamdev.filehub.repository.dbconstants.FileDaoConstants;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import static com.teamdev.filehub.repository.sql.ConnectionJDBC.getConnection;
import static com.teamdev.filehub.repository.sql.EscapeForLike.escapeForLike;

public class FileDaoInDB implements FileDao {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    @Override
    public List<FileRecord> findAll() {

        List<FileRecord> fileRecords = new ArrayList<>();

        try (Connection con = getConnection();

             Statement stmt = con.createStatement();

             ResultSet rs = stmt.executeQuery(FileDaoConstants.FROM_FILES)) {

            while (rs.next()) {

                fileRecords.add(mapFile(rs));
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());
        }

        logger.atInfo().log("We read list of files tokens: %s", fileRecords);

        return fileRecords;
    }

    @Override
    public Optional<FileRecord> read(RecordId identifier) {

        List<FileRecord> fileRecords = new ArrayList<>();

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(FileDaoConstants.FROM_FILES_BY_ID)) {

            stmt.setString(1, "%" + escapeForLike(identifier.getId()) + "%");

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    fileRecords.add(mapFile(rs));
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());

        }
        return Optional.ofNullable(fileRecords.get(0));
    }

    @Override
    public void create(FileRecord entity) {

        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(FileDaoConstants.INSERT_INTO_FILES);

            int k = 0;

            stmt.setString(++k, entity.getId().getId());
            stmt.setString(++k, entity.getName());
            stmt.setString(++k, entity.getSize());
            stmt.setString(++k, entity.getMimetype());
            stmt.setString(++k, entity.getParentFolderId());
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
    public FileRecord update(FileRecord entity)  {
        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(FileDaoConstants.UPDATE_FILES);

            int k = 0;

            stmt.setString(++k, entity.getName());
            stmt.setString(++k, entity.getSize());
            stmt.setString(++k, entity.getMimetype());
            stmt.setString(++k, entity.getParentFolderId());
            stmt.setString(++k, entity.getOwnerId());

            stmt.setString(++k, entity.getId().getId());


            int count = stmt.executeUpdate();

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
    public void updateName(String id, String name) {
        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(FileDaoConstants.UPDATE_NAME);

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
    public void delete(RecordId entity) {

        Connection con = null;

        PreparedStatement stmt = null;

        try {

            con = getConnection();

            stmt = con.prepareStatement(FileDaoConstants.DELETE_FILES_BY_ID);

            stmt.setString(1, entity.getId());

            stmt.executeUpdate();
        } catch (SQLException e) {
            //log
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        } finally {
            close(con);
            close(stmt);
        }

    }

    @Override
    public Optional<FileRecord> findFile(FileRecord file) {
        return
                findAll().stream()
                        .filter(FileRecord -> FileRecord.getParentFolderId().equals(file.getParentFolderId()))
                        .filter(folderRecord -> folderRecord.getMimetype().equals(file.getMimetype()))
                        .filter(folderRecord -> folderRecord.getName().equals(file.getName()))
                        .findAny();

    }

    @Override
    public boolean checkForFileExistence(FileRecord file) {
        List<FileRecord> read = findAll();

        Optional<FileRecord> any = read
                .stream()
                .filter(FileRecord -> FileRecord.getParentFolderId().equals(file.getParentFolderId()))
                .filter(folderRecord -> folderRecord.getMimetype().equals(file.getMimetype()))
                .filter(folderRecord -> folderRecord.getName().equals(file.getName()))
                .findAny();


        return any.isPresent();
    }

    @Override
    public List<FileRecord> findFilesByParent(String parentId) {

        List<FileRecord> fileRecords = new ArrayList<>();

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(FileDaoConstants.FROM_FILES_BY_PARENT_ID)) {

            stmt.setString(1, parentId);

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    fileRecords.add(mapFile(rs));
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());

        }
        return fileRecords;
    }

    @Override
    public List<FileRecord> findFilesByParentAndName(String parentId, String name) {
        List<FileRecord> fileRecords = new ArrayList<>();

        try (Connection con = getConnection();

             PreparedStatement stmt = con.prepareStatement(FileDaoConstants.FROM_FILES_BY_PARENT_ID_AND_NAME)) {

            stmt.setString(1, parentId);
            stmt.setString(2, "%" + escapeForLike(name) + "%");

            try (ResultSet rs = stmt.executeQuery()) {

                while (rs.next()) {

                    fileRecords.add(mapFile(rs));
                }
            } catch (SQLException e) {

                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        } catch (SQLException e) {

            throw new RuntimeException(e.getMessage());

        }
        return fileRecords;
    }

    private FileRecord mapFile(ResultSet rs) throws SQLException {

        FileRecord p = new FileRecord();

        p.setId(new RecordId(rs.getString("id")));

        p.setName(rs.getString("name"));

        p.setSize(rs.getString("size"));

        p.setMimetype(rs.getString("mimetype"));

        p.setParentFolderId(rs.getString("parentId"));

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
