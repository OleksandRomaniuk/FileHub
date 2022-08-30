package com.teamdev.repository;

import com.google.common.flogger.FluentLogger;
import com.teamdev.database.DataBase;
import com.teamdev.database.folder.FolderData;
import com.teamdev.record.FolderRecord;
import com.teamdev.record.UserId;
import com.teamdev.util.DataBaseException;
import com.teamdev.util.QueryRequestException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FolderInMemoryDao implements FolderDao {

    private final DataBase dataBase;

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    public FolderInMemoryDao(DataBase base) {
        this.dataBase = base;
    }


    @Override
    public FolderRecord readById(String identifier) throws QueryRequestException {

        if (!dataBase.getFolderTable().containsId(identifier)) {

            return null;
        }

        Optional<FolderData> optionalFolderData = dataBase.getFolderTable().readById(identifier);

        FolderData folderData = optionalFolderData.get();

        FolderRecord folderRecord
                = new FolderRecord(
                new UserId(folderData.getId()),
                folderData.getName(), folderData.getParentId(),
                folderData.getIdOfOwner());

        return folderRecord;
    }

    @Override
    public void create(FolderRecord entity) throws QueryRequestException {
        FolderData folderData = new FolderData(
                entity.getId().getId(),
                entity.getName(), entity.getParentId(),
                entity.getIdOfOwner());

        try {

            dataBase.getFolderTable().add(folderData);

        } catch (DataBaseException e) {
            throw new QueryRequestException(e.getMessage());

        }

    }

    @Override
    public FolderRecord update(FolderRecord entity) {

        FolderData folderData = new FolderData(
                entity.getId().getId(),
                entity.getName(), entity.getParentId(),
                entity.getIdOfOwner());

        dataBase.getFolderTable().update(folderData);

        return entity;
    }

    @Override
    public FolderRecord delete(FolderRecord entity) throws QueryRequestException {

        try {
            dataBase.getFolderTable().delete(entity.getId().getId());
        } catch (DataBaseException e) {
            throw new QueryRequestException(e.getMessage());
        }

        return entity;
    }

    @Override
    public List<FolderRecord> read() {

        List<FolderData> folders = new ArrayList<>(
                dataBase
                        .getFolderTable()
                        .getListOfObjects());

        List<FolderRecord> folderRecords = new ArrayList<>();
        logger.atInfo().log("We read list of folder: %s", folderRecords);

        for (FolderData folderData : folders) {
//            if(folderData.getParentId() ==null){
//                folderRecords.add(
//                        new FolderRecord(
//                                new UserId(folderData.getId()),
//                                folderData.getIdOfOwner()));
//            }else {
            folderRecords.add(
                    new FolderRecord(
                            new UserId(folderData.getId()),
                            folderData.getName(), folderData.getParentId(),
                            folderData.getIdOfOwner()));

            // }

        }

        return folderRecords;

    }

    @Override
    public String findFirstFolderByOwner(String idOfOwner) {
        List<FolderRecord> read = read();

        Optional<FolderRecord> root = read
                .stream()
                .filter(folderRecord -> folderRecord.getIdOfOwner().equals(idOfOwner))
                .filter(folderRecord -> folderRecord.getParentId().equals("root")).findFirst();

        if(root.isPresent()){

            return root.get().getId().getId();
        }
        return null;
    }
}
