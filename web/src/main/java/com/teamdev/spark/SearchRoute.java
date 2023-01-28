package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.dto.ItemInfo;
import com.teamdev.filehub.getdata.folder.content.search.GetFolderContentByNameQuery;
import com.teamdev.filehub.getdata.folder.content.search.GetFolderContentByNameView;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.List;
import java.util.Map;

/**
 * The {@link AuthorizedUserRoute} which is responsible for handling requests
 * to retrieve the contents of a certain folder by item name.
 */
public class SearchRoute extends AuthorizedUserRoute {

    private final Gson gson = new Gson();

    private final GetFolderContentByNameView view;

    @ParametersAreNonnullByDefault
    public SearchRoute(AuthenticatedView authenticatedView,
                       GetFolderContentByNameView view) {
        super(authenticatedView);
        this.view = Preconditions.checkNotNull(view);
    }

    /**
     * Loads folder content by folderId and the name of the searched item from params in the response.
     *
     * @param request  The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @param id       The user identification
     * @return The list of the folders and files which is set in response
     */
    @Override
    Object authorizedHandle(Request request, Response response, RecordId id) {

        final String folderId = request.params("folderId");
        final String name = request.params("name");

        List<ItemInfo> items = view.run(new GetFolderContentByNameQuery(id, folderId, name));

        return gson.toJson(Map.of("folderContent", Map.of("items", items)));
    }
}
