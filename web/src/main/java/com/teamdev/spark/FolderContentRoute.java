package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.dto.ItemInfo;
import com.teamdev.filehub.getdata.folder.content.FolderContentQuery;
import com.teamdev.filehub.getdata.folder.content.FolderContentView;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.List;
import java.util.Map;


/**
 * This example demonstrate the route for retrieve the contents of a folder.
 */
public class FolderContentRoute extends AuthorizedUserRoute {
    private final FolderContentView folderContentViewView;
    private final Gson gson = new Gson();
    @ParametersAreNonnullByDefault
    public FolderContentRoute(AuthenticatedView authenticatedView,
                              FolderContentView folderContentViewView) {
        super(authenticatedView);
        this.folderContentViewView = Preconditions.checkNotNull(folderContentViewView);
    }

    /**
     * Loads folder content by folderId from params in the response.
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        final String folderId = request.params("folderId");

        List<ItemInfo> items = folderContentViewView.run(new FolderContentQuery(id, folderId));

        return gson.toJson(Map.of("folderContent", Map.of("items", items)));
    }
}
