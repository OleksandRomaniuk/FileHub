package com.teamdev.filehub.renaming.folder;

import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.renaming.RenamingCommand;
import com.teamdev.filehub.renaming.RenamingProcess;
import com.teamdev.filehub.repository.FolderDao;

/**
 * Class represents a process renaming folder in the system.
 */
public class RenamingFolderProcess implements RenamingProcess {

    private final FolderDao folderDao;

    public RenamingFolderProcess(FolderDao folderDao) {
        this.folderDao = folderDao;
    }

    @Override
    public RecordId handle(RenamingCommand command) {

        folderDao.updateName(command.getItemId(), command.getNewName());

        return new RecordId(command.getItemId());
    }
}
