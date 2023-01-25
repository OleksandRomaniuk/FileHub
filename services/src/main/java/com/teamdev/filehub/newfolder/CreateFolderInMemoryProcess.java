package com.teamdev.filehub.newfolder;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.util.ConstTimeZone;

import javax.annotation.ParametersAreNonnullByDefault;
import java.time.LocalDateTime;

/**
 * The process for create new folder in application.
 */
public class CreateFolderInMemoryProcess implements CreateFolderProcess {

    private final FolderDao folderDao;

    @ParametersAreNonnullByDefault
    public CreateFolderInMemoryProcess(FolderDao folderDao) {

        this.folderDao = Preconditions.checkNotNull(folderDao);
    }

    @Override
    public String handle(CreateFolderCommand command)
            throws FolderAlreadyExistException {

        String name = command.getName();

        String idOfOwner = command.getIdOfOwner();

        String idOfParentFolder = command.getIdOfParentFolder();

        String id = name + LocalDateTime.now(ConstTimeZone.getTimeZone());

        FolderRecord folderRecord = new FolderRecord(
                new RecordId(id),
                name,
                idOfParentFolder,
                idOfOwner
        );

        boolean fileExistenceCheck = folderDao.checkForFolderExistence(folderRecord);

        if (!fileExistenceCheck) {
            folderDao.create(new FolderRecord(
                    new RecordId(id),
                    name,
                    idOfParentFolder,
                    idOfOwner
            ));
        } else {
            throw new FolderAlreadyExistException("Folder with such name already exist.");
        }

        return id;
    }
}
