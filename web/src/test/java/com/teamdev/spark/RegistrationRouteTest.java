package com.teamdev.spark;

import com.google.gson.Gson;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.registration.RegistrationProcess;
import com.teamdev.filehub.registration.UserAlreadyRegisteredException;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import java.util.Map;

import static com.google.common.truth.Truth.assertWithMessage;

public class RegistrationRouteTest {
    private final Gson gson = new Gson();

    @Test
    void shouldSuccessfulRegisterNewUser() throws Exception {
        RecordId userId = new RecordId("userId");

        RegistrationProcess process = Mockito.mock(RegistrationProcess.class);
        Mockito.when(process.handle(Mockito.any())).thenReturn(userId);

        RegistrationRoute route = new RegistrationRoute(process);

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.body())
                .thenReturn(gson.toJson(
                        Map.of("email", "testmail@gmail.com", "password", "testPassword")));

        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed register user").that(route.handle(request, response)).isEqualTo(gson.toJson(userId));

        Mockito.verify(response).status(200);
        Mockito.verify(request).body();
    }

    @Test
    void shouldFailRegistrationAlreadyRegisteredUser() throws Exception {

        RegistrationError registrationError = new RegistrationError();
        registrationError.addError("email", "such email already registered");

        RegistrationProcess process = Mockito.mock(RegistrationProcess.class);
        Mockito.when(process.handle(Mockito.any()))
                .thenThrow(new UserAlreadyRegisteredException("such email already registered"));

        RegistrationRoute route = new RegistrationRoute(process);


        Request request = Mockito.mock(Request.class);
        Mockito.when(request.body())
                .thenReturn(gson.toJson(
                        Map.of("email", "testmail@gmail.com", "password", "testPassword")));

        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed register user").that(route.handle(request, response))
                .isEqualTo(gson.toJson(registrationError));

        Mockito.verify(response).status(422);
        Mockito.verify(request).body();
    }

    @Test
    void shouldFailRegistrationUserWithNotValidEmail() throws Exception {

        RegistrationError registrationError = new RegistrationError();
        registrationError.addError("email", "such email already registered");

        RegistrationProcess process = Mockito.mock(RegistrationProcess.class);
        Mockito.when(process.handle(Mockito.any())).thenThrow(new UserAlreadyRegisteredException("such email already registered"));

        RegistrationRoute route = new RegistrationRoute(process);

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.body())
                .thenReturn(gson.toJson(
                        Map.of("email", "testmail@gmail.com", "password", "testPassword")));

        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed register user").that(route.handle(request, response)).isEqualTo(gson.toJson(registrationError));

        Mockito.verify(response).status(422);
        Mockito.verify(request).body();
    }
}
