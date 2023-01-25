package com.teamdev.filehub.newfolder;

import com.teamdev.filehub.ProcessException;

public class FolderAlreadyExistException extends ProcessException {

    public FolderAlreadyExistException(String message) {
        super(message);
    }
}
