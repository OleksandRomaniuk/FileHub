package com.teamdev.spark;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.registration.RegisterUserCommand;
import com.teamdev.filehub.registration.RegistrationProcess;
import com.teamdev.filehub.registration.UserAlreadyRegisteredException;
import com.teamdev.filehub.util.ValidationException;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.List;
import java.util.Map;

/**
 * Route for registration, add new user in database.
 */
public class RegistrationRoute implements Route {

    private final RegistrationProcess registrationProcess;

    public RegistrationRoute(RegistrationProcess registrationProcess) {
        this.registrationProcess = registrationProcess;
    }

    @Override
    public Object handle(Request request, Response response) throws Exception {

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
