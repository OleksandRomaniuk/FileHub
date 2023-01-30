package com.teamdev.filehub.delete;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.database.util.FileStorage;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The implementation of deleting a file from the file system.
 */
public class DeleteFileProcess implements DeleteItemProcess {

    private final FileDao fileDao;
    private final FileStorage fileStorage;

    @ParametersAreNonnullByDefault
    public DeleteFileProcess(FileStorage fileStorage, FileDao fileDao) {
        this.fileStorage = Preconditions.checkNotNull(fileStorage);
        this.fileDao = Preconditions.checkNotNull(fileDao);
    }

    @Override
    public RecordId handle(DeleteItemCommand command) {

        RecordId fileId = new RecordId(command.getItemId());

        fileDao.delete(fileId);

        fileStorage.delete(command.getItemId());

        return fileId;
    }
}
