package com.teamdev.spark;

import com.google.common.testing.NullPointerTester;
import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.dto.ItemInfo;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.search.FolderContentDataByNameView;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;

import java.util.List;

import static com.google.common.truth.Truth.assertWithMessage;

class SearchRouteTest {
    @Test
    void shouldSuccessfulGetFolderContentData() throws UnauthorizedException {
        final RecordId testRecordId = new RecordId("testId");

        FolderRecord folderRecord = new FolderRecord(testRecordId, "testName", "testOwnerId");

        ItemInfo itemInfo = new ItemInfo(folderRecord);

       FolderContentDataByNameView view = Mockito.mock(FolderContentDataByNameView.class);
        Mockito.when(view.run(Mockito.any())).thenReturn(List.of(itemInfo));

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        SearchRoute route = new SearchRoute(authenticatedView, view);

        Request request = Mockito.mock(Request.class);
        Mockito.when(request.params("folderId")).thenReturn("testId");
        Mockito.when(request.params("name")).thenReturn("testName");

        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed get folder data")
                .that(route.authorizedHandle(request, response, new RecordId("testOwnerId")))
                .isEqualTo(
                        "{\"folderContent\":{\"items\":[{\"type\":\"folder\",\"id\":\"testId\"," +
                                "\"name\":\"testName\",\"ownerId\":\"testOwnerId\"}]}}");

    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(SearchRoute.class);
    }
}
