package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.savefile.SaveFileCommand;
import com.teamdev.filehub.savefile.SaveFileProcess;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.Map;

/**
 * The {@link AuthorizedUserRoute} which is responsible for handling requests to upload one or multiple files.
 */
public class UploadFilesRoute extends AuthorizedUserRoute {

    private final Gson gson = new Gson();

    private final SaveFileProcess saveFileProcess;

    @ParametersAreNonnullByDefault
    public UploadFilesRoute(AuthenticatedView authenticatedView,
                            SaveFileProcess saveFileProcess) {
        super(authenticatedView);
        this.saveFileProcess = Preconditions.checkNotNull(saveFileProcess);
    }

    /**
     * Upload files in the system.
     *
     * @param request  The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @param id       The user identification
     * @return  The empty body or message with an error which is set in response
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));

        try {

            Collection<Part> parts = request.raw().getParts();

            for (Part part : parts) {
                try (InputStream input = part.getInputStream()) {

                    String name = part.getSubmittedFileName();
                    String size = String.valueOf(part.getSize());
                    String mimetype = part.getContentType();
                    String ownerId = id.getId();
                    String parentFolderId = request.params("folderId");

                    SaveFileCommand saveFileCommand
                            = new SaveFileCommand(input, name, size, mimetype, ownerId, parentFolderId);

                    saveFileProcess.handle(saveFileCommand);
                }
            }
        } catch (ServletException | IOException e) {

            response.status(500);
            return gson.toJson(Map.of("error", e.getMessage()));
        }

        response.status(200);
        return "";
    }
}
