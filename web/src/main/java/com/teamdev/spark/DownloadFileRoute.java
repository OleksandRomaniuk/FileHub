package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.downaldfile.DownloadQuery;
import com.teamdev.filehub.downaldfile.DownloadView;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.util.DownloadException;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

/**
 * The {@link AuthorizedUserRoute} which is responsible for downloading the file from the server.
 * Catch an exception if during download view was problems.
 */
public class DownloadFileRoute extends AuthorizedUserRoute {

    private final Gson gson = new Gson();

    private final DownloadView downloadView;

    @ParametersAreNonnullByDefault
    public DownloadFileRoute(AuthenticatedView authenticatedView,
                             DownloadView downloadView) {
        super(authenticatedView);
        this.downloadView = Preconditions.checkNotNull(downloadView);
    }

    /**
     * Opens the {@link OutputStream} of the response to write file content.
     *
     * @param request  The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @param id       The user identification
     * @return The empty body or message with an error which is set in response
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {
        String fileId = request.params("id");

        DownloadQuery downloadQuery = new DownloadQuery(fileId, id.getId());

        InputStream inputStream;

        try {
            inputStream = downloadView.run(downloadQuery);
        } catch (DownloadException e) {
            response.status(500);
            return gson.toJson(Map.of("error", e.getMessage()));
        }

        byte[] buffer = new byte[1000];

        try {
            OutputStream outputStream = response.raw().getOutputStream();

            while (inputStream.available() > 0) {
                int count = inputStream.read(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
            inputStream.close();

        } catch (IOException e) {
            response.status(500);
            return gson.toJson(Map.of("error", e.getMessage()));
        }
        response.status(200);
        return "";
    }
}
