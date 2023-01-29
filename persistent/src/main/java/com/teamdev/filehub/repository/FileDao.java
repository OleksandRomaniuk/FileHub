package com.teamdev.filehub.repository;

import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.RecordId;

import java.util.List;
import java.util.Optional;

/**
 * Files data access objects
 */
public interface FileDao extends EntityDao<FileRecord, RecordId> {
    @Override
    List<FileRecord> findAll();

    @Override
    Optional<FileRecord> read(RecordId identifier) ;

    @Override
    void create(FileRecord entity) ;

    @Override
    FileRecord update(FileRecord entity) ;

    void updateName(String id, String name);

    @Override
    void delete(RecordId entity) ;

    Optional<FileRecord> findFile(FileRecord file) ;

    boolean checkForFileExistence(FileRecord file);

    List<FileRecord> findFilesByParent(String parentId);

    List<FileRecord> findFilesByParentAndName(String parentId, String name);
}
