package com.teamdev.filehub.downaldfile;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.database.util.FileStorage;
import com.teamdev.filehub.util.DownloadException;

import javax.annotation.ParametersAreNonnullByDefault;
import java.io.InputStream;
import java.util.Optional;


/**
 * Represent an operation for downloading file from the drive.
 */
public class DownloadFileView implements DownloadView {

    private final FileDao fileDao;

    private final FileStorage fileStorage;

    @ParametersAreNonnullByDefault
    public DownloadFileView(FileDao fileDao, FileStorage fileStorage) {
        this.fileDao = Preconditions.checkNotNull(fileDao);
        this.fileStorage = Preconditions.checkNotNull(fileStorage);
    }

    @Override
    public InputStream run(DownloadQuery query) throws DownloadException {

        String fileId = query.getFileId();

        String idOfOwner = query.getIdOfOwner();

        Optional<FileRecord> fileRecord = fileDao.read(new RecordId(fileId));

        if (fileRecord.isEmpty()) {
            throw new DownloadException("there is no such file in the database.");
        }

        if (fileRecord.get().getOwnerId().equals(idOfOwner)) {

            return fileStorage.download(fileId);
        }

        return null;
    }
}
