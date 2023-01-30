package com.teamdev.spark;

import com.google.common.testing.NullPointerTester;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.logout.LogOutProcess;
import com.teamdev.filehub.record.RecordId;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import static com.google.common.truth.Truth.assertWithMessage;

class LogoutRouteTest {

    @Test
    void shouldSuccessfulLogout() throws UnauthorizedException {

        final RecordId testRecordId = new RecordId("testId");

        LogOutProcess process = Mockito.mock(LogOutProcess.class);
        Mockito.when(process.handle(Mockito.any())).thenReturn(testRecordId);

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        LogoutRoute route = new LogoutRoute(authenticatedView, process);

        Request request = Mockito.mock(Request.class);
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed to logout")
                .that(route.authorizedHandle(request, response, new RecordId("testOwnerId")))
                .isEqualTo(
                        "{\"id\":\"testId\"}");
        Mockito.verify(response).status(200);
        Mockito.verify(process).handle(Mockito.any());
    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(LogoutRoute.class);
    }
}
