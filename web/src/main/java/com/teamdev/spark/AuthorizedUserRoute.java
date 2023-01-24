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

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    public AuthorizedUserRoute(AuthenticatedView authenticatedView) {
        this.authenticatedView = authenticatedView;
    }

    @Override
    public Object handle(Request request, Response response) {
        try {

            String token = request.headers("Authorization").split("Bearer")[1].trim();

            logger.atInfo().log("token: %s",  token);

            TokenDataQuery tokenDataQuery = new TokenDataQuery(token);

            RecordId id = authenticatedView.run(tokenDataQuery);

            logger.atInfo().log("RecordId: %s",  id.getId());

            return this.authorizedHandle(request, response, id);

        } catch (UnauthorizedException e) {

            logger.atInfo().log("catch UnauthorizedException:  response.status(401);");

            response.status(401);
            return "";
        }
    }


    abstract Object authorizedHandle(Request request, Response response, RecordId id);
}

