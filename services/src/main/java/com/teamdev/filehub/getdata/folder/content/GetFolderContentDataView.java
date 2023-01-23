package com.teamdev.filehub.getdata.folder.content;

import com.teamdev.filehub.dto.ItemInfo;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.repository.FolderDao;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * The implementation of {@link GetFolderContentView} for get information about items in the folder.
 */
public class GetFolderContentDataView implements GetFolderContentView {

    private final FolderDao folderDao;
    private final FileDao fileDao;

    public GetFolderContentDataView(FolderDao folderDao, FileDao fileDao) {
        this.folderDao = folderDao;
        this.fileDao = fileDao;
    }


    @Override
    public List<ItemInfo> run(GetFolderContentQuery query) {

        List<FolderRecord> foldersByParent = folderDao.findFoldersByParent(query.getFolderId());
        List<FileRecord> filesByParent = fileDao.findFilesByParent(query.getFolderId());

        List<ItemInfo> itemsInfo = new LinkedList<>();

        List<ItemInfo> folders = foldersByParent.stream().map(ItemInfo::new).collect(Collectors.toList());
        List<ItemInfo> files = filesByParent.stream().map(ItemInfo::new).collect(Collectors.toList());

        itemsInfo.addAll(folders);
        itemsInfo.addAll(files);

        return itemsInfo;
    }
}
