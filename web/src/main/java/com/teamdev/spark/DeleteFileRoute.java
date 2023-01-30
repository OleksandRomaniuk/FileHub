package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.delete.DeleteFileProcess;
import com.teamdev.filehub.delete.DeleteItemCommand;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * This example demonstrate the route for deleting a file from the server.
 */
public class DeleteFileRoute extends AuthorizedUserRoute {

    private final DeleteFileProcess deleteFileProcess;

    @ParametersAreNonnullByDefault
    public DeleteFileRoute(AuthenticatedView authenticatedView,
                           DeleteFileProcess deleteFileProcess) {
        super(authenticatedView);
        this.deleteFileProcess = Preconditions.checkNotNull(deleteFileProcess);
    }

    /**
     * Deletes the certain file using fileId
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        String fileId = request.params("fileId");

        deleteFileProcess.handle(new DeleteItemCommand(id, fileId));

        response.status(200);

        return "";
    }
}

