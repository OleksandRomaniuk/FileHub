package com.teamdev.filehub.getdata.folder;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.dto.ItemInfo;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.FolderDao;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.Optional;

/**
 * The implementation of {@link FolderView} for get information about folder for generate path.
 */
public class FolderDataView implements FolderView {

    private final FolderDao folderDao;

    @ParametersAreNonnullByDefault
    public FolderDataView(FolderDao folderDao) {
        this.folderDao = Preconditions.checkNotNull(folderDao);
    }

    @Override
    public Optional<ItemInfo> run(FolderDataQuery query) {

        RecordId folderId = new RecordId(query.getFolderId());

        Optional<FolderRecord> folderRecord = folderDao.read(folderId);

        if (folderRecord.isPresent()) {

            ItemInfo folderInfo = new ItemInfo(folderRecord.get());

            return Optional.of(folderInfo);
        }
        return Optional.empty();
    }
}
