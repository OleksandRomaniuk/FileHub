package com.teamdev.spark;

import com.google.common.flogger.FluentLogger;
import com.google.gson.Gson;
import com.teamdev.filehub.authentication.AuthenticateUserCommand;
import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import com.teamdev.filehub.authentication.AuthenticationException;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Route for user authorization : checks user login and password
 * Return token
 */
public class AuthorizationRoute implements Route {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    private final UserAuthenticationProcess process;

    public AuthorizationRoute(UserAuthenticationProcess userAuthenticationProcess) {
        this.process = userAuthenticationProcess;
    }

    @Override
    public Object handle(Request request, Response response) throws Exception {

        Gson gson = new Gson();

        try {

            AuthenticateUserCommand authenticateUserCommand = gson.fromJson(
                    request.body(),
                    AuthenticateUserCommand.class);

            String token = process.handle(authenticateUserCommand);

            response.status(200);

            Map<String, String> map = new LinkedHashMap<>();

            map.put("token", token);

            logger.atInfo().log("token: %s",  token);

            return gson.toJson(map);

        } catch (AuthenticationException e) {

            response.status(401);
            return "";
        }
    }
}
