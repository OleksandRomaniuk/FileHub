package com.teamdev.filehub.getdata.folder.content;

import com.teamdev.filehub.View;
import com.teamdev.filehub.dto.ItemInfo;

import java.util.List;

/**
 * Represents an operation for getting data about folder content
 */
@FunctionalInterface
public interface FolderContentView extends View<FolderContentQuery, List<ItemInfo>> {

    @Override
    List<ItemInfo> run(FolderContentQuery query);
}
