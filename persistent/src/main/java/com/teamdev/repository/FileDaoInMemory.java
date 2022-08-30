package com.teamdev.repository;

import com.google.common.flogger.FluentLogger;
import com.teamdev.database.DataBase;
import com.teamdev.database.file.FileData;
import com.teamdev.record.FileRecord;
import com.teamdev.record.UserId;
import com.teamdev.util.DataBaseException;
import com.teamdev.util.QueryRequestException;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.ArrayList;
import java.util.List;

public class FileDaoInMemory implements FileDao {

    private final DataBase dataBase;

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    public FileDaoInMemory(DataBase base) {
        this.dataBase = base;
    }

    /**
     * Read all records from file table.
     *
     * @return list of files.
     */
    @Override
    public List<FileRecord> read() {

        List<FileData> listOfFiles = dataBase.getFileTable().getListOfObjects();

        List<FileRecord> result = new ArrayList<>();

        for (FileData fileData : listOfFiles) {

            result.add(new FileRecord(
                    new UserId(fileData.getId()),
                    fileData.getName(),
                    fileData.getSize(),
                    fileData.getExtension(),
                    fileData.getIdOfParentFolder(),
                    fileData.getIdOfOwner()));
        }

        return result;
    }


    /**
     * Searching {@link FileRecord} by identifier.
     *
     * @param identifier id of file
     * @return {@link FileRecord} by identifier.
     */
    @Override
    public FileRecord readById(String identifier) throws QueryRequestException {

        if (!dataBase.getFileTable().containsId(identifier)) {

            return null;
        }

        FileData userTokensData = dataBase.getFileTable().readById(identifier).get();

        FileRecord fileRecord
                = new FileRecord(
                new UserId(userTokensData.getId()),
                userTokensData.getName(),
                userTokensData.getSize(),
                userTokensData.getExtension(),
                userTokensData.getIdOfParentFolder(),
                userTokensData.getIdOfOwner());

        return fileRecord;

    }


    /**
     * Add new record of file.
     *
     * @param entity {@link FileRecord} that try to add into list of files.
     */
    @ParametersAreNonnullByDefault
    @Override
    public void create(FileRecord entity) throws QueryRequestException {

        FileData fileData = new FileData(
                entity.getId().getId(),
                entity.getName(),
                entity.getSize(),
                entity.getExtension(),
                entity.getIdOfParentFolder(),
                entity.getIdOfOwner());

        try {
            dataBase.getFileTable().add(fileData);
        } catch (DataBaseException e) {
            throw new QueryRequestException(e.getMessage());
        }

    }



    /**
     * In the event of a change in the file data,
     * update the file in the system.
     *
     * @param entity - updated object
     * @return updated {@link FileRecord}
     */
    @ParametersAreNonnullByDefault
    @Override
    public FileRecord update(FileRecord entity) {

        FileData user = new FileData(
                entity.getId().getId(),
                entity.getName(),
                entity.getSize(),
                entity.getExtension(),
                entity.getIdOfParentFolder(),
                entity.getIdOfOwner());

        dataBase.getFileTable().update(user);

        return entity;
    }

    /**
     * Delete file.
     *
     * @param entity - deleted file
     * @return deleted file
     */
    @ParametersAreNonnullByDefault
    @Override
    public FileRecord delete(FileRecord entity) throws QueryRequestException {

        try {
            dataBase.getFileTable().delete(entity.getId().getId());
        } catch (DataBaseException e) {
            throw new QueryRequestException(e.getMessage());
        }

        return entity;

    }



}
