package com.teamdev.filehub.delete;

import com.google.common.base.Preconditions;
import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.storage.FileStorage;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.List;

/**
 * The implementation of {@link DeleteItemProcess} that responsible for deleting a specific folder and inner items
 * from the file system.
 */
public class DeleteFolderProcess implements DeleteItemProcess {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    private final FileDao fileDao;

    private final FolderDao folderDao;

    private final FileStorage fileStorage;

    @ParametersAreNonnullByDefault
    public DeleteFolderProcess(FileStorage fileStorage, FileDao fileDao, FolderDao folderDao) {
        this.fileDao = Preconditions.checkNotNull(fileDao);
        this.folderDao = Preconditions.checkNotNull(folderDao);
        this.fileStorage = Preconditions.checkNotNull(fileStorage);
    }

    @Override
    public RecordId handle(DeleteItemCommand command) {

        RecordId folderId = new RecordId(command.getItemId());

        List<FolderRecord> foldersByParent = folderDao.findFoldersByParent(folderId.getId());

        List<FileRecord> filesByParent = fileDao.findFilesByParent(folderId.getId());

        filesByParent.forEach(fileRecord -> {
            fileDao.delete(fileRecord.getId());
            fileStorage.delete(fileRecord.getId().getId());
        });

        foldersByParent.forEach(folderRecord -> this.deleteItemsInTheFolder(folderRecord.getId()));

        folderDao.delete(folderId);

        fileStorage.delete(command.getItemId());

        return folderId;
    }

    private void deleteItemsInTheFolder(RecordId folderId) {

        List<FileRecord> filesByParent = fileDao.findFilesByParent(folderId.getId());

        filesByParent.forEach(fileRecord -> {
            fileDao.delete(fileRecord.getId());
            fileStorage.delete(fileRecord.getId().getId());
        });

        List<FolderRecord> foldersByParent = folderDao.findFoldersByParent(folderId.getId());

        foldersByParent.forEach(folderRecord -> {
            this.deleteItemsInTheFolder(folderRecord.getId());

            logger.atInfo().log("delete from folder table: %s", folderRecord.getId());

            folderDao.delete(folderRecord.getId());
        });

        folderDao.delete(folderId);
    }
}
