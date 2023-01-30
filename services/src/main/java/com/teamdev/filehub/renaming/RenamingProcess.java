package com.teamdev.filehub.renaming;

import com.teamdev.filehub.Process;
import com.teamdev.filehub.record.RecordId;

/**
 * Represents operation for renaming item
 */
@FunctionalInterface
public interface RenamingProcess extends Process<RenamingCommand, RecordId> {
    @Override
    RecordId handle(RenamingCommand command);
}
