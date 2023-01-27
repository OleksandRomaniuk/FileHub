package com.teamdev.filehub.renaming.file;

import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.renaming.RenamingCommand;
import com.teamdev.filehub.renaming.RenamingProcess;
import com.teamdev.filehub.repository.FileDao;

/**
 * Class represents a process renaming file in the system.
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
