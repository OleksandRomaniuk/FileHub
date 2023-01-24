package com.teamdev.spark;

import com.google.gson.Gson;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.delete.DeleteFileProcess;
import com.teamdev.filehub.delete.DeleteItemCommand;
import com.teamdev.filehub.record.RecordId;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import static com.google.common.truth.Truth.assertWithMessage;

class DeleteFileRouteTest {

    @Test
    void shouldSuccessfulDeleteFile() throws UnauthorizedException {

        final RecordId testRecordId = new RecordId("testId");

        DeleteFileProcess process = Mockito.mock(DeleteFileProcess.class);

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        DeleteFileRoute route = new DeleteFileRoute(authenticatedView, process);

        final String fileId = "testFileId";

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.params("fileId")).thenReturn(fileId);
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed to delete the file")
                .that(route.authorizedHandle(request, response, new RecordId("testOwnerId")))
                .isEqualTo("");

        Mockito.verify(response).status(200);
        Mockito.verify(request).params("fileId");
        Mockito.verify(process).handle(Mockito.any());
    }
}
