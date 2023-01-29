package com.teamdev.filehub.uploadfile;

import com.teamdev.filehub.Process;

/**
 * Represents operation for uploading file
 */
@FunctionalInterface
public interface SaveProcess extends Process<SaveFileCommand, String> {
    @Override
    String handle(SaveFileCommand command);
}
