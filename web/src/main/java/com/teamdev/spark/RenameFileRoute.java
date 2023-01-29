package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.renaming.RenamingCommand;
import com.teamdev.filehub.renaming.RenamingFileProcess;
import com.teamdev.filehub.ValidationException;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.Map;

/**
 * This example demonstrate the route for renaming a file.
 */
public class RenameFileRoute extends AuthorizedUserRoute {

    private final Gson gson = new Gson();

    private final RenamingFileProcess renamingProcess;

    @ParametersAreNonnullByDefault
    public RenameFileRoute(AuthenticatedView authenticatedView,
                           RenamingFileProcess renamingProcess) {
        super(authenticatedView);
        this.renamingProcess = Preconditions.checkNotNull(renamingProcess);
    }

    /**
     * Renames the certain file using fileId
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        JsonObject userCredentials = gson.fromJson(request.body(), JsonObject.class);

        try {

            renamingProcess.handle(new RenamingCommand(request.params("fileId"), userCredentials.get("name").getAsString()));

        } catch (ValidationException e) {

            response.status(422);
            return gson.toJson(Map.of("errors", e.getMessage()));

        }

        response.status(200);
        return "";
    }
}
