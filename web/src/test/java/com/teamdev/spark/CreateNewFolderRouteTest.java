package com.teamdev.spark;

import com.google.common.testing.NullPointerTester;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.newfolder.CreateFolderProcess;
import com.teamdev.filehub.record.RecordId;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import java.util.Map;

import static com.google.common.truth.Truth.assertWithMessage;

class CreateNewFolderRouteTest {

    private final Gson gson = new Gson();

    @Test
    void shouldSuccessfulCreateNewFolder() throws UnauthorizedException {
        final RecordId testRecordId = new RecordId("testId");

        CreateFolderProcess process = Mockito.mock(CreateFolderProcess.class);

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        CreateNewFolderRoute route = new CreateNewFolderRoute(authenticatedView, process);

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.body()).thenReturn(gson.toJson(
                Map.of
                        ("name", "testName",
                                "parentId", "testParentId")));
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed create new folder")
                .that(route.authorizedHandle(request, response, new RecordId("testOwnerId")))
                .isEqualTo(
                        "");
        Mockito.verify(response).status(200);
        Mockito.verify(request).body();

    }


    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(CreateNewFolderRoute.class);
    }

}
