package com.teamdev.spark;

import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.delete.DeleteFolderProcess;
import com.teamdev.filehub.delete.DeleteItemCommand;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

/**
 * The {@link AuthorizedUserRoute} which is responsible deleting a folder and items in this folderfrom the server.
 */
public class DeleteFolderRoute extends AuthorizedUserRoute {

    private final DeleteFolderProcess deleteFolderProcess;

    public DeleteFolderRoute(AuthenticatedView authenticatedView,
                             DeleteFolderProcess deleteFolderProcess) {
        super(authenticatedView);
        this.deleteFolderProcess = deleteFolderProcess;
    }

    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        String folderId = request.params("folderId");

        deleteFolderProcess.handle(new DeleteItemCommand(id, folderId));

        response.status(200);

        return "";
    }
}
