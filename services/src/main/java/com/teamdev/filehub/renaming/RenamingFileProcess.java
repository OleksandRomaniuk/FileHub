package com.teamdev.filehub.renaming;

import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.renaming.RenamingCommand;
import com.teamdev.filehub.renaming.RenamingProcess;
import com.teamdev.filehub.repository.FileDao;

/**
 * The process for renaming file in the system.
 */
public class RenamingFileProcess implements RenamingProcess {

    private final FileDao fileDao;

    public RenamingFileProcess(FileDao fileDao) {
        this.fileDao = fileDao;
    }

    @Override
    public RecordId handle(RenamingCommand command) {

        fileDao.updateName(command.getItemId(), command.getNewName());

        return new RecordId(command.getItemId());
    }
}
