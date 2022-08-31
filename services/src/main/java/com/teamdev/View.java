package com.teamdev;

import com.teamdev.util.DownloadException;

public interface View<S extends Query, K> {
    K run(S query) throws DownloadException;
}
