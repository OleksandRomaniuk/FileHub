package com.teamdev.filehub.delete;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.database.util.FileStorage;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FileDao;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class DeleteFileProcessTest {
    @Test
    public void evaluationOfDeletingAFile() {

        FileStorage fileStorage = Mockito.mock(FileStorage.class);
        FileDao fileDao = Mockito.mock(FileDao.class);

        DeleteFileProcess deleteFileProcess = new DeleteFileProcess(fileStorage, fileDao);

        RecordId testUserId = new RecordId("userId");

        final String testFileId = "testFileId";

        DeleteItemCommand command = new DeleteItemCommand(testUserId, testFileId);

        RecordId handle = deleteFileProcess.handle(command);

        Truth.assertThat(handle).isEqualTo(new RecordId(testFileId));

        Mockito.verify(fileStorage).delete(testFileId);
        Mockito.verify(fileDao).delete(Mockito.any());
    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(DeleteFileProcess.class);
    }
}
