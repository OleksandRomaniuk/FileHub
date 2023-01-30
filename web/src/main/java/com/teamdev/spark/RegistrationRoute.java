package com.teamdev.spark;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.registration.RegisterUserCommand;
import com.teamdev.filehub.registration.RegistrationProcess;
import com.teamdev.filehub.registration.UserAlreadyRegisteredException;
import com.teamdev.filehub.ValidationException;
import com.teamdev.spark.error.RegistrationError;
import spark.Request;
import spark.Response;
import spark.Route;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * Route for registration, add new user in database.
 */
public class RegistrationRoute implements Route {

    private final RegistrationProcess registrationProcess;

    @ParametersAreNonnullByDefault
    public RegistrationRoute(RegistrationProcess registrationProcess) {
        this.registrationProcess = Preconditions.checkNotNull(registrationProcess);
    }

    /**
     * Registers a user in the system, entering his personal data into the database.
     *
     * @param request  The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @return The id of the user that registered in the system or error message which is set in response
     */
    @Override
    public Object handle(Request request, Response response) {

        Gson gson = new Gson();

        JsonObject userCredentials = gson.fromJson(request.body(), JsonObject.class);


        RegisterUserCommand registerUserCommand;

        try {

            registerUserCommand = new RegisterUserCommand(
                    userCredentials.get("email").getAsString(),
                    userCredentials.get("password").getAsString());

        } catch (ValidationException e) {

            RegistrationError registrationError = new RegistrationError();

            registrationError.addError(e.getField(), e.getMessage());

            response.status(422);

            return gson.toJson(registrationError);
        }

        try {

            RecordId handle = registrationProcess.handle(registerUserCommand);

            response.status(200);

            return gson.toJson(handle);

        } catch (UserAlreadyRegisteredException e) {

            RegistrationError registrationError = new RegistrationError();

            registrationError.addError("email", e.getMessage());

            response.status(422);

            return gson.toJson(registrationError);
        }
    }
}
