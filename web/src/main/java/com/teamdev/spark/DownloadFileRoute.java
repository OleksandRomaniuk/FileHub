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
 * This example demonstrate the route for downloading the file from the server.
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
     * Opens the OutputStream to write file content.
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
