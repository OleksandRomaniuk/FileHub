package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.dto.ItemInfo;
import com.teamdev.filehub.search.FolderContentByNameQuery;
import com.teamdev.filehub.search.FolderContentByNameView;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.List;
import java.util.Map;

/**
 * * This example demonstrate the route for retrieving the contents of a certain folder by item name.
 */
public class SearchRoute extends AuthorizedUserRoute {

    private final Gson gson = new Gson();

    private final FolderContentByNameView view;

    @ParametersAreNonnullByDefault
    public SearchRoute(AuthenticatedView authenticatedView,
                       FolderContentByNameView view) {
        super(authenticatedView);
        this.view = Preconditions.checkNotNull(view);
    }

    /**
     * Loads folder content by folderId and the name of the searched item from params in the response.
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        final String folderId = request.params("folderId");
        final String name = request.params("name");

        List<ItemInfo> items = view.run(new FolderContentByNameQuery(id, folderId, name));

        return gson.toJson(Map.of("folderContent", Map.of("items", items)));
    }
}
