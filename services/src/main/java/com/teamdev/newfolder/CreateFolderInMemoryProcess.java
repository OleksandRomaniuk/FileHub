package com.teamdev.newfolder;

import com.teamdev.record.FolderRecord;
import com.teamdev.record.UserId;
import com.teamdev.repository.FolderDao;
import com.teamdev.util.ConstTimeZone;
import com.teamdev.util.ProcessException;
import com.teamdev.util.QueryRequestException;

import java.time.LocalDateTime;

public class CreateFolderInMemoryProcess implements CreateFolderProcess {

    private final FolderDao folderDao;

    public CreateFolderInMemoryProcess(FolderDao folderDao) {
        this.folderDao = folderDao;
    }

    @Override
    public String handle(CreateFolderCommand command)
            throws ProcessException {

        String name = command.getName();

        String idOfOwner = command.getIdOfOwner();

        String idOfParentFolder = command.getIdOfParentFolder();

        String id = name + LocalDateTime.now(ConstTimeZone.getTimeZone());

        try {

            folderDao.create(new FolderRecord(
                    new UserId(id),
                    name,
                    idOfParentFolder,
                    idOfOwner
            ));

        } catch (QueryRequestException e) {

            throw new ProcessException(e.getMessage());
        }


        return id;
    }
}
