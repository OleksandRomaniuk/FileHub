package com.teamdev.spark;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.newfolder.CreateFolderCommand;
import com.teamdev.filehub.newfolder.CreateFolderProcess;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.newfolder.FolderAlreadyExistException;
import com.teamdev.filehub.util.ValidationException;
import spark.Request;
import spark.Response;

import java.util.Map;

/**
 * The {@link AuthorizedUserRoute} which is responsible for creating a new folder in the system.
 */
public class CreateNewFolderRoute extends AuthorizedUserRoute {

    private final Gson gson = new Gson();

    private final CreateFolderProcess createFolderProcess;

    public CreateNewFolderRoute(AuthenticatedView authenticatedView,
                                CreateFolderProcess createFolderProcess) {
        super(authenticatedView);
        this.createFolderProcess = createFolderProcess;
    }

    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        JsonObject folderCredentials = gson.fromJson(request.body(), JsonObject.class);

        CreateFolderCommand createFolderCommand;

        try {

            createFolderCommand = new CreateFolderCommand(
                    folderCredentials.get("name").getAsString(),
                    folderCredentials.get("parentId").getAsString(),
                    id.getId());

        } catch (ValidationException e) {
            response.status(422);
            return gson.toJson(Map.of("error", e.getMessage()));
        }

        try {

            createFolderProcess.handle(createFolderCommand);

            response.status(200);

            return "";

        } catch (FolderAlreadyExistException e) {

            response.status(422);

            return gson.toJson(Map.of("error", e.getMessage()));
        }
    }
}
