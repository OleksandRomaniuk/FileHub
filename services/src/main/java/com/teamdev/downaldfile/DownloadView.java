package com.teamdev.downaldfile;

import com.teamdev.View;
import com.teamdev.util.DownloadException;

import java.io.InputStream;

/**
 * For running  {@link DownloadQuery} and returning {@link InputStream}.
 */
public interface DownloadView extends View<DownloadQuery, InputStream> {

    @Override
    InputStream run(DownloadQuery query) throws DownloadException;
}
