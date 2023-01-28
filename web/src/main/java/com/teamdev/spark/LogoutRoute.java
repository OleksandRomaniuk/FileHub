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
 * The {@link AuthorizedUserRoute} which handles user logout. Process deletes user token.
 */
public class LogoutRoute extends AuthorizedUserRoute {

    private final Gson gson = new Gson();

    private final LogOutProcess logOutProcess;

    @ParametersAreNonnullByDefault
    public LogoutRoute(AuthenticatedView authenticatedView,
                       LogOutProcess logOutProcess) {
        super(authenticatedView);
        this.logOutProcess = Preconditions.checkNotNull(logOutProcess);
    }

    /**
     * Logs out the user from the system deleting the token.
     *
     * @param request  The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @param id       The user identification
     * @return The id of the user that logged out of the system which is set in response
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        RecordId userId = logOutProcess.handle(new LogOutCommand(id));

        response.status(200);

        return gson.toJson(userId);
    }
}
