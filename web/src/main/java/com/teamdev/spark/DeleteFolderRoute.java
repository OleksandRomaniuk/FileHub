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
 * This example demonstrate the route for deleting a folder and items
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
     * Deletes the certain folder and inner content using folderId
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        String folderId = request.params("folderId");

        deleteFolderProcess.handle(new DeleteItemCommand(id, folderId));

        response.status(200);

        return "";
    }
}
