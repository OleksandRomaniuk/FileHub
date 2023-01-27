package com.teamdev.filehub.renaming;

import com.teamdev.filehub.Process;
import com.teamdev.filehub.record.RecordId;

/**
 * The interface represents operation of renaming item using {@link RenamingCommand}.
 */
@FunctionalInterface
public interface RenamingProcess extends Process<RenamingCommand, RecordId> {
    @Override
    RecordId handle(RenamingCommand command);
}
