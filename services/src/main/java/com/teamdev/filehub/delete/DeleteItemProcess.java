package com.teamdev.filehub.delete;

import com.teamdev.filehub.Process;
import com.teamdev.filehub.newfolder.CreateFolderCommand;
import com.teamdev.filehub.record.RecordId;

/**
 * The interface represents the operation of deleting a file or folder using {@link CreateFolderCommand}.
 */
@FunctionalInterface
public interface DeleteItemProcess extends Process<DeleteItemCommand, RecordId> {
    @Override
    RecordId handle(DeleteItemCommand command);
}
