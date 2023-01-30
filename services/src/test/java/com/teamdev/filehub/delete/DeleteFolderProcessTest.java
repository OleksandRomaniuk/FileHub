package com.teamdev.filehub.delete;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.database.util.FileStorage;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.repository.FolderDao;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.LinkedList;
import java.util.List;

class DeleteFolderProcessTest {
    @Test
    public void evaluationOfDeletingAFolder() {

        String folderId = "testFolderId";

        List<FileRecord> filesByParent = new LinkedList<>();

        filesByParent.add(new FileRecord(
                new RecordId("firstFileId"),
                "firstFile",
                "54544",
                "application/pdf",
                "testOwnerId",
                folderId
        ));

        FileStorage fileStorage = Mockito.mock(FileStorage.class);

        FileDao fileDao = Mockito.mock(FileDao.class);
        Mockito.when(fileDao.findFilesByParent(folderId))
                .thenReturn(filesByParent);

        List<FolderRecord> foldersByParent = new LinkedList<>();

        foldersByParent.add(new FolderRecord(
                new RecordId("firstFolderId"),
                "firstFolder",
                "parentIdOfFirstFolder",
                "testOwnerId"));


        FolderDao folderDao = Mockito.mock(FolderDao.class);
        Mockito.when(folderDao.findFoldersByParent(folderId))
                .thenReturn(foldersByParent);

        DeleteFolderProcess deleteFileProcess = new DeleteFolderProcess(fileStorage, fileDao, folderDao);

        RecordId testUserId = new RecordId("userId");


        DeleteItemCommand command = new DeleteItemCommand(testUserId, folderId);

        RecordId handle = deleteFileProcess.handle(command);

        Truth.assertThat(handle).isEqualTo(new RecordId(folderId));

        Mockito.verify(fileStorage).delete(folderId);
        Mockito.verify(folderDao, Mockito.times(2)).delete(Mockito.any());
        Mockito.verify(fileDao).delete(Mockito.any());
    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(DeleteFolderProcess.class);
    }
}
