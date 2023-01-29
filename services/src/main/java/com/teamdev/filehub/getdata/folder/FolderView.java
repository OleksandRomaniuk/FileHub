package com.teamdev.filehub.getdata.folder;

import com.teamdev.filehub.View;
import com.teamdev.filehub.dto.ItemInfo;

import java.util.Optional;

/**
 * Represents an operation getting data about folder from {@link FolderDataQuery}
 * and returns {@link ItemInfo}.
 */
@FunctionalInterface
public interface FolderView extends View<FolderDataQuery, Optional<ItemInfo>> {
    @Override
    Optional<ItemInfo> run(FolderDataQuery query);
}
