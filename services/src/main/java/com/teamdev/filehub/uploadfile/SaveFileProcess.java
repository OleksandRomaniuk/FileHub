package com.teamdev.filehub.uploadfile;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.database.util.FileStorage;
import com.teamdev.filehub.util.ConstTimeZone;

import javax.annotation.ParametersAreNonnullByDefault;
import java.io.InputStream;
import java.time.LocalDateTime;


/**
 * The process for uploading file in application
 */
public class SaveFileProcess implements SaveProcess {

    private final FileDao fileDao;

    private final FileStorage fileStorage;

    @ParametersAreNonnullByDefault
    public SaveFileProcess(FileDao fileDao, FileStorage fileStorage) {

        this.fileDao = Preconditions.checkNotNull(fileDao);
        this.fileStorage = fileStorage;
    }


    @Override
    public String handle(SaveFileCommand command) {

        InputStream inputStream;
        String id;

        inputStream = command.getInputStream();

        String fileName = command.getName();

        String size = command.getSize();

        String extension = command.getMimetype();

        String idOwner = command.getOwnerId();

        String idOfParentFolder = command.getParentFolderId();

        String path = command.getPath();

        LocalDateTime now = LocalDateTime.now(ConstTimeZone.getTimeZone());

        id = fileName + now.getSecond() + now.getMinute() + now.getHour();

        FileRecord file = new FileRecord(
                new RecordId(id),
                fileName,
                size,
                extension,
                idOwner,
                idOfParentFolder);

        fileDao.create(file);

        fileStorage.upload(inputStream, id);

        return id;

    }
}
