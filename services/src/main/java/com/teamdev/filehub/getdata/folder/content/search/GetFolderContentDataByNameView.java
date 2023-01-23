package com.teamdev.filehub.getdata.folder.content.search;

import com.teamdev.filehub.dto.ItemInfo;
import com.teamdev.filehub.record.FileRecord;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.repository.FileDao;
import com.teamdev.filehub.repository.FolderDao;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * The implementation of {@link GetFolderContentByNameView} that retrieves the content of a specific folder by name.
 */
public class GetFolderContentDataByNameView implements GetFolderContentByNameView {

    private final FolderDao folderDao;
    private final FileDao fileDao;

    public GetFolderContentDataByNameView(FolderDao folderDao, FileDao fileDao) {
        this.folderDao = folderDao;
        this.fileDao = fileDao;
    }

    @Override
    public List<ItemInfo> run(GetFolderContentByNameQuery query) {

        List<FolderRecord> foldersByParent = folderDao.findFilesByParentAndName(query.getFolderId(), query.getItemName());
        List<FileRecord> filesByParent = fileDao.findFilesByParentAndName(query.getFolderId(), query.getItemName());

        List<ItemInfo> itemsInfo = new LinkedList<>();

        List<ItemInfo> folders = foldersByParent.stream().map(ItemInfo::new).collect(Collectors.toList());
        List<ItemInfo> files = filesByParent.stream().map(ItemInfo::new).collect(Collectors.toList());

        itemsInfo.addAll(folders);
        itemsInfo.addAll(files);

        return itemsInfo;
    }


}
