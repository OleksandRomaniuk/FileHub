package com.teamdev.filehub.getdata.folder.content;

import com.teamdev.filehub.View;
import com.teamdev.filehub.dto.ItemInfo;

import java.util.List;

/**
 * Represents an operation getting data about folder content from {@link GetFolderContentQuery}
 * and returns {@link List<ItemInfo>}.
 */
@FunctionalInterface
public interface GetFolderContentView extends View<GetFolderContentQuery, List<ItemInfo>> {

    @Override
    List<ItemInfo> run(GetFolderContentQuery query);
}
