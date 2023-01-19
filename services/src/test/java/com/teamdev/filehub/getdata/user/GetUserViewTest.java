package com.teamdev.filehub.getdata.user;

import com.google.common.truth.Truth;
import com.teamdev.filehub.dto.UserInfo;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.repository.UserDao;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

class GetUserViewTest {
    @Test
    void getUserDataTest() {

        RecordId testRecordId = new RecordId("testId");
        UserRecord userRecordForTest = new UserRecord(testRecordId, "email", "password");
        FolderRecord folderRecord = new FolderRecord(new RecordId("testFolderId"), "name", testRecordId.getId());

        GetUserDataQuery getUserDataQuery = new GetUserDataQuery(testRecordId);

        UserDao userDao = Mockito.mock(UserDao.class);
        FolderDao folderDao = Mockito.mock(FolderDao.class);

        Mockito.when(userDao.read(Mockito.any())).thenReturn(Optional.of(userRecordForTest));
        Mockito.when(folderDao.findUserRootFolder(Mockito.any())).thenReturn(folderRecord);

        GetUserDataView getUserView = new GetUserDataView(userDao, folderDao);

        Optional<UserInfo> userInfo = getUserView.run(getUserDataQuery);

        Mockito.verify(userDao).read(testRecordId);

        Truth.assertThat(userInfo.get().getEmail()).isEqualTo("email");
        Truth.assertThat(userInfo.get().getRootFolderId()).isEqualTo("testFolderId");
    }
}
