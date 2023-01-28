package com.teamdev.filehub.logout;

import com.teamdev.filehub.Process;
import com.teamdev.filehub.record.RecordId;

/**
 * The process for log out user in FileHub application.
 */
@FunctionalInterface
public interface LogOutProcess extends Process<LogOutCommand, RecordId> {
    @Override
    RecordId handle(LogOutCommand command);
}
