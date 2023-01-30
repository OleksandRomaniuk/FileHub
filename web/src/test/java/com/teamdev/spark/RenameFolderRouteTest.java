package com.teamdev.spark;

import com.google.common.testing.NullPointerTester;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.renaming.RenamingFolderProcess;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import java.util.Map;

import static com.google.common.truth.Truth.assertWithMessage;

class RenameFolderRouteTest {
    private final Gson gson = new Gson();

    @Test
    void shouldSuccessfulRenameFolder() throws UnauthorizedException {

        final RecordId testRecordId = new RecordId("testId");

        RenamingFolderProcess process = Mockito.mock(RenamingFolderProcess.class);

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        RenameFolderRoute route = new RenameFolderRoute(authenticatedView, process);

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.body()).thenReturn(gson.toJson(
                Map.of
                        ("name", "testName")));
        Mockito.when(request.params("folderId")).thenReturn("testFolderId");

        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed to rename folder")
                .that(route.authorizedHandle(request, response, new RecordId("testOwnerId")))
                .isEqualTo(
                        "");
        Mockito.verify(response).status(200);
        Mockito.verify(request).body();

    }

}
