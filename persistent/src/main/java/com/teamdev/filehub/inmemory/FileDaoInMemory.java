package com.teamdev.filehub.inmemory;

import com.teamdev.filehub.database.DataBase;
import com.teamdev.filehub.database.table.FileTable;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FileDao;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Dao for work with files metadata.
 */
public class FileDaoInMemory
        extends DaoInMemory<FileRecord, FileTable>
        implements FileDao {


    public FileDaoInMemory(DataBase base) {
        super(base.getFileTable());
    }


    @Override
    public void updateName(String id, String name) {

        Optional<FileRecord> file = this.read(new RecordId(id));

        if(file.isPresent()){
            FileRecord fileRecord = file.get();
            fileRecord.setName(name);
            table.update(fileRecord);
        }
    }

    @Override
    public Optional<FileRecord> findFile(FileRecord file) {
        return  findAll()
                .stream()
                .filter(fileRecord -> fileRecord.getParentFolderId().equals(file.getParentFolderId()))
                .filter(fileRecord -> fileRecord.getMimetype().equals(file.getMimetype()))
                .filter(fileRecord -> fileRecord.getName().equals(file.getName()))
                .findAny();
    }

    @Override
    public boolean checkForFileExistence(FileRecord file) {

        List<FileRecord> read = findAll();

        Optional<FileRecord> any = read
                .stream()
                .filter(fileRecord -> fileRecord.getParentFolderId().equals(file.getParentFolderId()))
                .filter(fileRecord -> fileRecord.getMimetype().equals(file.getMimetype()))
                .filter(fileRecord -> fileRecord.getName().equals(file.getName()))
                .findAny();


        return any.isPresent();
    }

    @Override
    public List<FileRecord> findFilesByParent(String parentId) {
        List<FileRecord> read = findAll();

        return read
                .stream()
                .filter(fileRecord -> fileRecord.getParentFolderId().equals(parentId))
                .collect(Collectors.toList());
    }

    @Override
    public List<FileRecord> findFilesByParentAndName(String parentId, String name) {
        List<FileRecord> read = findAll();

        return read
                .stream()
                .filter(fileRecord -> fileRecord.getParentFolderId().equals(parentId)
                        && fileRecord.getName().contains(name))
                .collect(Collectors.toList());
    }
}
