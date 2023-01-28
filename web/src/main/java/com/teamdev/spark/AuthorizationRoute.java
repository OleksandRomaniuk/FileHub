package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.common.flogger.FluentLogger;
import com.google.gson.Gson;
import com.teamdev.filehub.authentication.AuthenticateUserCommand;
import com.teamdev.filehub.authentication.AuthenticationException;
import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import spark.Request;
import spark.Response;
import spark.Route;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Route for user authorization, checks user login and password and returns token.
 */
public class AuthorizationRoute implements Route {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    private final UserAuthenticationProcess process;

    @ParametersAreNonnullByDefault
    public AuthorizationRoute(UserAuthenticationProcess userAuthenticationProcess) {
        this.process = Preconditions.checkNotNull(userAuthenticationProcess);
    }

    /**
     * Gives the user permission to access a specific resource with token.
     *
     * @param request The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @return The token of the user that log in the system or error message which is set in response
     */
    @Override
    public Object handle(Request request, Response response) {

        Gson gson = new Gson();

        try {

            AuthenticateUserCommand authenticateUserCommand = gson.fromJson(
                    request.body(),
                    AuthenticateUserCommand.class);

            String token = process.handle(authenticateUserCommand);

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
