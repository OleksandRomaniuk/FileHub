package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.renaming.RenamingCommand;
import com.teamdev.filehub.renaming.file.RenamingFileProcess;
import com.teamdev.filehub.util.ValidationException;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.Map;

/**
 * The {@link AuthorizedUserRoute} which is responsible for handling requests to rename a file.
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
     * Renames the certain file using fileId from a {@link Request} and validates new name by {@link RenamingCommand}.
     *
     * @param request  The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @param id       The user identification
     * @return The empty message in the successful case or an error message if ValidationException was thrown.
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        JsonObject userCredentials = gson.fromJson(request.body(), JsonObject.class);

        try {

            renamingProcess.handle(
                    new RenamingCommand(request.params("fileId"), userCredentials.get("name").getAsString()));

        } catch (ValidationException e) {

            response.status(422);
            return gson.toJson(Map.of("errors", e.getMessage()));
        }

        response.status(200);
        return "";
    }
}
