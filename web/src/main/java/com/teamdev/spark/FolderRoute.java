package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.dto.ItemInfo;
import com.teamdev.filehub.getdata.folder.FolderDataQuery;
import com.teamdev.filehub.getdata.folder.FolderView;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.Map;
import java.util.Optional;

/**
 * This example demonstrate the route for retrieve the information about folder.
 */
public class FolderRoute extends AuthorizedUserRoute {
    private final Gson gson = new Gson();

    private final FolderView folderView;

    @ParametersAreNonnullByDefault
    public FolderRoute(AuthenticatedView authenticatedView, FolderView folderView) {
        super(authenticatedView);
        this.folderView = Preconditions.checkNotNull(folderView);
    }

    /**
     * Loads folder information by folderId from params in the response.
     */
    @Override
    public Object authorizedHandle(Request request, Response response, RecordId id) {

        final String folderId = request.params("folderId");

        Optional<ItemInfo> folderInfo = folderView.run(new FolderDataQuery(id, folderId));

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
