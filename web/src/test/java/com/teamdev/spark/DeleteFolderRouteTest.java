package com.teamdev.spark;

import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.delete.DeleteFileProcess;
import com.teamdev.filehub.delete.DeleteFolderProcess;
import com.teamdev.filehub.record.RecordId;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import static com.google.common.truth.Truth.assertWithMessage;

class DeleteFolderRouteTest {

    @Test
    void shouldSuccessfulDeleteFolder() throws UnauthorizedException {

        final RecordId testRecordId = new RecordId("testId");

        DeleteFolderProcess process = Mockito.mock(DeleteFolderProcess.class);

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        DeleteFolderRoute route = new DeleteFolderRoute(authenticatedView, process);

        final String fileId = "testFolderId";

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.params("folderId")).thenReturn(fileId);
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed to delete the folder")
                .that(route.authorizedHandle(request, response, new RecordId("testOwnerId")))
                .isEqualTo("");

        Mockito.verify(response).status(200);
        Mockito.verify(request).params("folderId");
        Mockito.verify(process).handle(Mockito.any());
    }
}
