package com.teamdev.spark;

import com.google.common.testing.NullPointerTester;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.savefile.SaveFileProcess;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;

import static com.google.common.truth.Truth.assertWithMessage;

class UploadFilesRouteTest {

    @Test
    void shouldSuccessfulUploadFiles()
            throws UnauthorizedException, ServletException, IOException {

        final RecordId testRecordId = new RecordId("testId");

        SaveFileProcess process = Mockito.mock(SaveFileProcess.class);

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        UploadFilesRoute route = new UploadFilesRoute(authenticatedView, process);

        HttpServletRequest httpServletRequest = Mockito.mock(HttpServletRequest.class);

        InputStream inputStream = Mockito.mock(InputStream.class);
        String name = "testName";
        long size = 2000;
        String mimetype = "application/pdf";
        String parentFolderId = "testParentFolderId";

        Part part = Mockito.mock(Part.class);
        Mockito.when(part.getInputStream()).thenReturn(inputStream);
        Mockito.when(part.getSubmittedFileName()).thenReturn(name);
        Mockito.when(part.getSize()).thenReturn(size);
        Mockito.when(part.getContentType()).thenReturn(mimetype);

        Collection<Part> parts = new ArrayList<>();
        parts.add(part);

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.raw()).thenReturn(httpServletRequest);
        Mockito.when(httpServletRequest.getParts()).thenReturn(parts);


        Mockito.when(request.params("folderId")).thenReturn(parentFolderId);
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed to upload file")
                .that(route.authorizedHandle(request, response, testRecordId))
                .isEqualTo("");

        Mockito.verify(response).status(200);
        Mockito.verify(part).getInputStream();
        Mockito.verify(part).getSubmittedFileName();
        Mockito.verify(part).getSize();
        Mockito.verify(part).getContentType();
    }
    @Test
    void evaluationForNull() {

        NullPointerTester nullPointerTester = new NullPointerTester();

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        SaveFileProcess saveFileProcess = Mockito.mock(SaveFileProcess.class);

        nullPointerTester.setDefault(AuthenticatedView.class, authenticatedView);
        nullPointerTester.setDefault(SaveFileProcess.class, saveFileProcess);

        nullPointerTester.testAllPublicConstructors(UploadFilesRoute.class);
    }
}
