package com.teamdev.filehub.delete;

import com.teamdev.filehub.Process;
import com.teamdev.filehub.newfolder.CreateFolderCommand;
import com.teamdev.filehub.record.RecordId;

/**
 * Represents the operation of deleting a file or folder
 */
@FunctionalInterface
public interface DeleteItemProcess extends Process<DeleteItemCommand, RecordId> {
    @Override
    RecordId handle(DeleteItemCommand command);
}
