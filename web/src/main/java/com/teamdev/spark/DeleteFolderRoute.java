package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.delete.DeleteFolderProcess;
import com.teamdev.filehub.delete.DeleteItemCommand;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The {@link AuthorizedUserRoute} which is responsible deleting a folder and items in this folderfrom the server.
 */
public class DeleteFolderRoute extends AuthorizedUserRoute {

    private final DeleteFolderProcess deleteFolderProcess;

    @ParametersAreNonnullByDefault
    public DeleteFolderRoute(AuthenticatedView authenticatedView,
                             DeleteFolderProcess deleteFolderProcess) {
        super(authenticatedView);
        this.deleteFolderProcess = Preconditions.checkNotNull(deleteFolderProcess);
    }

    /**
     * Deletes the certain folder and inner content using folderId from a {@link Request}.
     *
     * @param request  The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @param id       The user identification
     * @return The empty body with successful status
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        String folderId = request.params("folderId");

        deleteFolderProcess.handle(new DeleteItemCommand(id, folderId));

        response.status(200);

        return "";
    }
}
