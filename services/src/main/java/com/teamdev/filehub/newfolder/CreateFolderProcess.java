package com.teamdev.filehub.newfolder;

import com.teamdev.filehub.Process;

/**
 * Represents operation for creating new folder
 */
@FunctionalInterface
public interface CreateFolderProcess extends Process<CreateFolderCommand, String> {
    @Override
    String handle(CreateFolderCommand command) throws FolderAlreadyExistException;
}
