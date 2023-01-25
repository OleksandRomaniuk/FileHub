package com.teamdev.filehub.newfolder;

import com.teamdev.filehub.Process;

/**
 * The interface represents operation of creating new folder using {@link CreateFolderCommand}.
 */
@FunctionalInterface
public interface CreateFolderProcess extends Process<CreateFolderCommand, String> {
    @Override
    String handle(CreateFolderCommand command) throws FolderAlreadyExistException;
}
