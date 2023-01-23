package com.teamdev.filehub.getdata.folder.content.search;

import com.teamdev.filehub.View;
import com.teamdev.filehub.dto.ItemInfo;

import java.util.List;

/**
 * Represents an operation getting data about folder content by name from {@link GetFolderContentByNameQuery}
 * and returns {@link List<ItemInfo>}.
 */
@FunctionalInterface
public interface GetFolderContentByNameView extends View<GetFolderContentByNameQuery, List<ItemInfo>> {

    @Override
    List<ItemInfo> run(GetFolderContentByNameQuery query);
}
