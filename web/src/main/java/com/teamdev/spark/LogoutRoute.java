package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.logout.LogOutCommand;
import com.teamdev.filehub.logout.LogOutProcess;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * This example demonstrate the route for deleting user's token.
 */
public class LogoutRoute extends AuthorizedUserRoute {
    private final LogOutProcess logOutProcess;
    private final Gson gson = new Gson();
    @ParametersAreNonnullByDefault
    public LogoutRoute(AuthenticatedView authenticatedView,
                       LogOutProcess logOutProcess) {
        super(authenticatedView);
        this.logOutProcess = Preconditions.checkNotNull(logOutProcess);
    }

    /**
     * Logs out the user from the system deleting the token.
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        RecordId userId = logOutProcess.handle(new LogOutCommand(id));

        response.status(200);

        return gson.toJson(userId);
    }
}
