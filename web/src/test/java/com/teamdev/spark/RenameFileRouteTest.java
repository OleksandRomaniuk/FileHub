package com.teamdev.spark;

import com.google.common.testing.NullPointerTester;
import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.renaming.RenamingFileProcess;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import java.util.Map;

import static com.google.common.truth.Truth.assertWithMessage;

class RenameFileRouteTest {
    private final Gson gson = new Gson();

    @Test
    void shouldSuccessfulRenameFile() throws UnauthorizedException {

        final RecordId testRecordId = new RecordId("testId");

        RenamingFileProcess process = Mockito.mock(RenamingFileProcess.class);

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        RenameFileRoute route = new RenameFileRoute(authenticatedView, process);

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.body()).thenReturn(gson.toJson(
                Map.of
                        ("name", "testName")));
        Mockito.when(request.params("fileId")).thenReturn("testFileId");
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed to rename file")
                .that(route.authorizedHandle(request, response, new RecordId("testOwnerId")))
                .isEqualTo(
                        "");
        Mockito.verify(response).status(200);
        Mockito.verify(request).body();
    }

    @Test
    void shouldFailRenameFile() throws UnauthorizedException {

        final RecordId testRecordId = new RecordId("testId");

        RenamingFileProcess process = Mockito.mock(RenamingFileProcess.class);

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        RenameFileRoute route = new RenameFileRoute(authenticatedView, process);

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.body()).thenReturn(gson.toJson(
                Map.of
                        ("name", "")));
        Mockito.when(request.params("fileId")).thenReturn("testFileId");
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed to rename file")
                .that(route.authorizedHandle(request, response, new RecordId("testOwnerId")))
                .isEqualTo(
                        "{\"errors\":\"length must be greater than 2 characters\"}");

        Mockito.verify(response).status(422);
        Mockito.verify(request).body();
        Mockito.verify(request).params("fileId");
    }

}
