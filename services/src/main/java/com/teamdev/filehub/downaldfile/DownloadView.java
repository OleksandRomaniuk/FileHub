package com.teamdev.filehub.downaldfile;

import com.teamdev.filehub.View;
import com.teamdev.filehub.util.DownloadException;

import java.io.InputStream;

/**
 * Represents an operation download file by file id from {@link DownloadQuery} and returns {@link InputStream}.
 */
@FunctionalInterface
public interface DownloadView extends View<DownloadQuery, InputStream> {

    @Override
    InputStream run(DownloadQuery query) throws DownloadException;
}
