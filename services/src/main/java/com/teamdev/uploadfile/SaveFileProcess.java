package com.teamdev.uploadfile;

import com.google.common.base.Preconditions;
import com.teamdev.record.FileRecord;
import com.teamdev.record.UserId;
import com.teamdev.repository.AuthenticationDao;
import com.teamdev.repository.FileDao;
import com.teamdev.repository.FolderDao;
import com.teamdev.storage.FileStorage;
import com.teamdev.util.ConstTimeZone;
import com.teamdev.util.GeneratorUserFile;
import com.teamdev.util.ProcessException;
import com.teamdev.util.QueryRequestException;

import java.io.InputStream;
import java.time.LocalDateTime;


/**
 * The implementation of {@link SaveProcess} for handling {@link SaveFileCommand} and upload.
 */
public class SaveFileProcess implements SaveProcess {

    private final FileDao fileDao;

    private final AuthenticationDao inMemoryAuthenticationDao;

    public SaveFileProcess(FileDao fileDao, AuthenticationDao inMemoryAuthenticationDao) {

        Preconditions.checkNotNull(fileDao);
        Preconditions.checkNotNull(inMemoryAuthenticationDao);

        this.fileDao = fileDao;
;
        this.inMemoryAuthenticationDao = inMemoryAuthenticationDao;
    }


    @Override
    public String handle(SaveFileCommand command) {

        InputStream inputStream = command.getInputStream();

        String fileName = command.getName();

        Double size = command.getSize();

        String extension = command.getExtension();

        String idOwner = command.getIdOfOwner();

        String idOfParentFolder = command.getIdOfParentFolder();

        if (inMemoryAuthenticationDao.checkToken(idOwner)) {

            FileStorage fileStorage = new FileStorage();

            LocalDateTime now = LocalDateTime.now(ConstTimeZone.getTimeZone());

            String id = fileName + now.getSecond() + now.getMinute() + now.getHour();

            fileStorage.upload(inputStream, id);

            try {

                fileDao.create(
                        new FileRecord(
                                new UserId(id),
                                fileName,
                                size,
                                extension,
                                idOfParentFolder,
                                idOwner
                        ));

                return id;

            } catch (QueryRequestException e) {

                new ProcessException(e.getMessage());
            }
        }

        return "You have to login.";
    }


}
