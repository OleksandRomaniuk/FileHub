package com.teamdev.filehub.search;

import com.teamdev.filehub.View;
import com.teamdev.filehub.dto.ItemInfo;

import java.util.List;

/**
 * Represents an operation getting data about folder content by name from
 */
@FunctionalInterface
public interface FolderContentByNameView extends View<FolderContentByNameQuery, List<ItemInfo>> {

    @Override
    List<ItemInfo> run(FolderContentByNameQuery query);
}
