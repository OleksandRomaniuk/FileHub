package com.teamdev.spark;

import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.delete.DeleteFileProcess;
import com.teamdev.filehub.delete.DeleteItemCommand;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

/**
 * Route which is responsible for deleting  file from the server.
 */
public class DeleteFileRoute extends AuthorizedUserRoute {

    private final DeleteFileProcess deleteFileProcess;

    public DeleteFileRoute(AuthenticatedView authenticatedView,
                           DeleteFileProcess deleteFileProcess) {
        super(authenticatedView);
        this.deleteFileProcess = deleteFileProcess;
    }

    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        String fileId = request.params("fileId");

        deleteFileProcess.handle(new DeleteItemCommand(id, fileId));

        response.status(200);

        return "";
    }
}

