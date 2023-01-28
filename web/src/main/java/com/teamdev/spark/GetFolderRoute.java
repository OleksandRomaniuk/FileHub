package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.dto.ItemInfo;
import com.teamdev.filehub.getdata.folder.GetFolderDataQuery;
import com.teamdev.filehub.getdata.folder.GetFolderView;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.Map;
import java.util.Optional;

/**
 * The {@link AuthorizedUserRoute} which is responsible for handling requests
 * to retrieve the information about folder.
 */
public class GetFolderRoute extends AuthorizedUserRoute {
    private final Gson gson = new Gson();

    private final GetFolderView getFolderView;

    @ParametersAreNonnullByDefault
    public GetFolderRoute(AuthenticatedView authenticatedView, GetFolderView getFolderView) {
        super(authenticatedView);
        this.getFolderView = Preconditions.checkNotNull(getFolderView);
    }

    /**
     * Loads folder information by folderId from params in the response.
     *
     * @param request  The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @param id       The user identification
     * @return The {@link ItemInfo} which is set in response with field folderInfo
     */
    @Override
    public Object authorizedHandle(Request request, Response response, RecordId id) {

        final String folderId = request.params("folderId");

        Optional<ItemInfo> folderInfo = getFolderView.run(new GetFolderDataQuery(id, folderId));

        if (folderInfo.isPresent()) {

            if (folderInfo.get().getOwnerId().equals(id.getId())) {

                response.status(200);

                return gson.toJson(Map.of("folderInfo", folderInfo.get()));

            } else {

                response.status(401);
            }
        }

        response.status(404);

        return "";
    }
}
