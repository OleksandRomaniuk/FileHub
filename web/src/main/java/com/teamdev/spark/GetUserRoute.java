package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.dto.UserInfo;
import com.teamdev.filehub.getdata.user.GetUserDataQuery;
import com.teamdev.filehub.getdata.user.GetUserDataView;
import com.teamdev.filehub.record.RecordId;
import spark.Request;
import spark.Response;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;


/**
 * The {@link AuthorizedUserRoute} which is responsible for handling requests
 * to retrieve the user info.
 */
public class GetUserRoute extends AuthorizedUserRoute {

    private final Gson gson = new Gson();

    private final GetUserDataView getUserView;

    @ParametersAreNonnullByDefault
    public GetUserRoute(AuthenticatedView authenticatedView, GetUserDataView getUserView) {
        super(authenticatedView);
        this.getUserView = Preconditions.checkNotNull(getUserView);
    }

    @Override
    public Object authorizedHandle(Request request, Response response, RecordId id) {

        Optional<UserInfo> user = getUserView.run(new GetUserDataQuery(id));

        if (user.isPresent()) {

            Map<String, UserInfo> userProfile = new LinkedHashMap<>();
            userProfile.put("userProfile", user.get());

            response.status(200);
            return gson.toJson(userProfile);
        }

        response.status(404);
        return "";
    }
}
