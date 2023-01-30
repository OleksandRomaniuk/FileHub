package com.teamdev.spark;


import com.teamdev.filehub.authenticateduser.AuthenticatedView;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.dto.UserInfo;
import com.teamdev.filehub.getdata.user.UserDataView;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserRecord;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import spark.Request;
import spark.Response;
import java.util.Optional;

import static com.google.common.truth.Truth.assertWithMessage;

class GetUserRouteTest {
    @Test
    void shouldSuccessfulGetUserData() throws UnauthorizedException {
        final RecordId testRecordId = new RecordId("testId");
        Optional<UserRecord> user = Optional.of(new UserRecord(
                testRecordId,
                "testEmail",
                "password"));
        UserInfo userInfo = new UserInfo(user.get().getEmail(), "rootFolderId");

        UserDataView view = Mockito.mock(UserDataView.class);
        Mockito.when(view.run(Mockito.any())).thenReturn(Optional.of(userInfo));

        AuthenticatedView authenticatedView = Mockito.mock(AuthenticatedView.class);
        Mockito.when(authenticatedView.run(Mockito.any())).thenReturn(testRecordId);

        UserRoute route = new UserRoute(authenticatedView, view);

        Request request = Mockito.mock(Request.class);
        Response response = Mockito.mock(Response.class);

        assertWithMessage("Failed get user data")
                .that(route.authorizedHandle(request, response, new RecordId("testEmail")))
                .isEqualTo("{\"userProfile\":{\"email\":\"testEmail\",\"rootFolderId\":\"rootFolderId\"}}");

        Mockito.verify(response).status(200);
    }


}
