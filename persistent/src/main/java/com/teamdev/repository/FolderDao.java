package com.teamdev.repository;

import com.teamdev.record.FolderRecord;
import com.teamdev.util.QueryRequestException;

import java.util.List;

public interface FolderDao extends EntityDao<FolderRecord, String> {
    @Override
    FolderRecord readById(String identifier) throws QueryRequestException;

    @Override
    void create(FolderRecord entity) throws QueryRequestException;

    @Override
    FolderRecord update(FolderRecord entity);

    @Override
    FolderRecord delete(FolderRecord entity) throws QueryRequestException;

    @Override
    List<FolderRecord> read();

    String findFirstFolderByOwner(String idOfOwner);

}
