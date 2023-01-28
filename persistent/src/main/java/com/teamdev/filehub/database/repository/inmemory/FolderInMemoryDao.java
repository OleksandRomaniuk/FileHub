package com.teamdev.filehub.database.repository.inmemory;

import com.teamdev.filehub.database.DataBase;
import com.teamdev.filehub.database.folder.FolderTable;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.repository.inmemory.DaoInMemory;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Dao for work with folders metadata.
 */
public class FolderInMemoryDao
        extends DaoInMemory<FolderRecord, FolderTable>
        implements FolderDao {


    public FolderInMemoryDao(DataBase base) {
        super(base.getFolderTable());
    }

    @Override
    public void updateName(String id, String name) {
        Optional<FolderRecord> folderRecord = this.read(new RecordId(id));

        if(folderRecord.isPresent()){
            FolderRecord folder = folderRecord.get();
            folder.setName(name);
            table.update(folder);
        }
    }

    @Override
    public boolean checkForFolderExistence(FolderRecord folder) {

        List<FolderRecord> read = this.findAll();

        Optional<FolderRecord> any = read
                .stream()
                .filter(folderRecord -> folderRecord.getParentId() != null)
                .filter(folderRecord -> folderRecord.getParentId().equals(folder.getParentId()))
                .filter(folderRecord -> folderRecord.getName().equals(folder.getName()))
                .findAny();

        return any.isPresent();
    }

    @Override
    public List<FolderRecord> findFoldersByParent(String parentId) {
        List<FolderRecord> allFolders = this.findAll();

        List<FolderRecord> folders = allFolders.stream()
                .filter(folderRecord -> folderRecord.getParentId().equals(parentId))
                .collect(Collectors.toList());

        return folders;
    }
    @Override
    public FolderRecord findUserRootFolder(RecordId userId) {

        List<FolderRecord> allFolders = this.findAll();

        Optional<FolderRecord> rootFolder = allFolders.stream()
                .filter(folderRecord -> folderRecord.getOwnerId().equals(userId.getId()))
                .filter(folderRecord -> folderRecord.getParentId() == null)
                .findFirst();

        return rootFolder.orElse(null);
    }

    @Override
    public List<FolderRecord> findFilesByParentAndName(String parentId, String name) {
        List<FolderRecord> allFolders = this.findAll();

        List<FolderRecord> folders = allFolders.stream()
                .filter(folderRecord -> folderRecord.getParentId().equals(parentId)
                        && folderRecord.getName().contains(name))
                .collect(Collectors.toList());

        return folders;
    }
}
