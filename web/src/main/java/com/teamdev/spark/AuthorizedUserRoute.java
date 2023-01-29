package com.teamdev.spark;

import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.TokenDataQuery;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import spark.Request;
import spark.Response;
import spark.Route;


public abstract class AuthorizedUserRoute implements Route {

    private final AuthenticatedView authenticatedView;
    public AuthorizedUserRoute(AuthenticatedView authenticatedView) {
        this.authenticatedView = authenticatedView;
    }
    @Override
    public Object handle(Request request, Response response) {
        try {

            String token = request.headers("Authorization").split("Bearer")[1].trim();

            TokenDataQuery tokenDataQuery = new TokenDataQuery(token);

            RecordId id = authenticatedView.run(tokenDataQuery);

            return this.authorizedHandle(request, response, id);

        } catch (UnauthorizedException e) {

            response.status(401);

            return response;
        }
    }
    abstract Object authorizedHandle(Request request, Response response, RecordId id);
}

