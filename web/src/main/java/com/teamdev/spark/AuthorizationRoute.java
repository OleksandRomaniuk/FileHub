package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.common.flogger.FluentLogger;
import com.google.gson.Gson;
import com.teamdev.filehub.authentication.AuthenticationCommand;
import com.teamdev.filehub.authentication.AuthenticationException;
import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import spark.Request;
import spark.Response;
import spark.Route;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Route for user authorization, checks user login and password
 * Return token
 */
public class AuthorizationRoute implements Route {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    private final UserAuthenticationProcess process;

    @ParametersAreNonnullByDefault
    public AuthorizationRoute(UserAuthenticationProcess userAuthenticationProcess) {
        this.process = Preconditions.checkNotNull(userAuthenticationProcess);
    }

    /**
     * Gives permission to access by giving the token.
     */
    @Override
    public Object handle(Request request, Response response) {

        Gson gson = new Gson();

        try {

            AuthenticationCommand authenticationCommand = gson.fromJson(request.body(), AuthenticationCommand.class);

            String token = process.handle(authenticationCommand);

            response.status(200);

            Map<String, String> map = new LinkedHashMap<>();

            map.put("token", token);

            logger.atInfo().log("token: %s", token);

            return gson.toJson(map);

        } catch (AuthenticationException e) {

            response.status(401);

            return "";
        }
    }
}
