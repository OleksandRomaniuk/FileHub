package com.teamdev.downaldfile;

import com.teamdev.record.FileRecord;
import com.teamdev.repository.FileDao;
import com.teamdev.storage.FileStorage;
import com.teamdev.util.DownloadException;
import com.teamdev.util.GeneratorUserFile;
import com.teamdev.util.QueryRequestException;

import java.io.InputStream;


/**
 * The implementation of {@link DownloadView} for downloading file from the drive.
 */
public class DownloadFileView implements DownloadView {

    private final FileDao fileDao;

    public DownloadFileView(FileDao fileDao) {
        this.fileDao = fileDao;
    }

    @Override
    public InputStream run(DownloadQuery query) throws DownloadException {

        String fileId = query.getFileId();

        String idOfOwner = query.getIdOfOwner();

        try {

            String idOfFile = GeneratorUserFile.generateFileName(idOfOwner) + fileId;

            FileRecord fileRecord = fileDao.readById(fileId);

            if (fileRecord == null) {
                throw new DownloadException("there is no such file in the database.");
            }

            if (fileRecord.getIdOfOwner().equals(idOfOwner)) {

                FileStorage fileStorage = new FileStorage();

                InputStream download = fileStorage.download(fileId);

                return download;
            }

        } catch (QueryRequestException e) {
            throw new DownloadException("there is no such file in the database.");
        }

        return null;
    }
}
