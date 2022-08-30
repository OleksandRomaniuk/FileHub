package com.teamdev.repository;

import com.teamdev.record.FileRecord;
import com.teamdev.util.QueryRequestException;

import java.util.List;

public interface FileDao extends EntityDao<FileRecord, String> {
    @Override
    List<FileRecord> read();

    @Override
    FileRecord readById(String identifier) throws QueryRequestException;

    @Override
    void create(FileRecord entity) throws QueryRequestException;

    @Override
    FileRecord update(FileRecord entity);

    @Override
    FileRecord delete(FileRecord entity) throws QueryRequestException;
}
