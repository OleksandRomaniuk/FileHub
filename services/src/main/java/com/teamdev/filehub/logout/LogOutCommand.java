package com.teamdev.filehub.logout;

import com.teamdev.filehub.authenticateduser.AuthenticatedUserCommand;
import com.teamdev.filehub.record.RecordId;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * This is the user's intention to log out in the FileHub application.
 */
public class LogOutCommand extends AuthenticatedUserCommand {

    @ParametersAreNonnullByDefault
    public LogOutCommand(RecordId id) {
        super(id);
    }

}
