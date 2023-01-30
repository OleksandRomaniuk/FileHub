package com.teamdev.spark;

import com.teamdev.filehub.authentication.UserAuthenticationProcess;
import com.teamdev.filehub.authentication.AuthenticationException;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import static com.google.common.truth.Truth.assertWithMessage;

public class AuthorizationRouteTest {

    @Test
    void shouldSuccessfulAuthorizeNewUser() throws Exception {
        String userId = "testToken";

        UserAuthenticationProcess process = Mockito.mock(UserAuthenticationProcess.class);
        Mockito.when(process.handle(Mockito.any())).thenReturn(userId);

        AuthorizationRoute route = new AuthorizationRoute(process);

        Request request = Mockito.mock(Request.class);
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed authorize user")
                .that(route.handle(request, response))
                .isEqualTo("{\"token\":\"testToken\"}");

        Mockito.verify(response).status(200);
        Mockito.verify(request).body();
    }

    @Test
    void registrationAlreadyRegisteredUser() throws Exception {

        UserAuthenticationProcess process = Mockito.mock(UserAuthenticationProcess.class);

        Mockito.when(process.handle(Mockito.any()))
                .thenThrow(AuthenticationException.class);

        AuthorizationRoute route = new AuthorizationRoute(process);

        Request request = Mockito.mock(Request.class);
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed register user")
                .that(route.handle(request, response))
                .isEqualTo("");

        Mockito.verify(response).status(401);
        Mockito.verify(request).body();
    }
}
