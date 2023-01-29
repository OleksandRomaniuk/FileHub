package com.teamdev.filehub.repository;

import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;

import java.util.List;
import java.util.Optional;

/**
 * Folder data access objects
 */
public interface FolderDao extends EntityDao<FolderRecord, RecordId> {

    @Override
    Optional<FolderRecord> read(RecordId id);

    @Override
    void create(FolderRecord entity);

    @Override
    FolderRecord update(FolderRecord entity);

    @Override
    void delete(RecordId entity);

    @Override
    List<FolderRecord> findAll();

    void updateName(String id, String name);

    boolean checkForFolderExistence(FolderRecord folder);

    List<FolderRecord> findFoldersByParent(String parentId);

    FolderRecord findUserRootFolder(RecordId userId);

    List<FolderRecord> findFilesByParentAndName(String parentId, String name);

}
