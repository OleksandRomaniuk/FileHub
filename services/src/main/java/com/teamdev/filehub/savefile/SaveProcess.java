package com.teamdev.filehub.savefile;

import com.teamdev.filehub.Process;

/**
 * Represents operation for upload file
 */
@FunctionalInterface
public interface SaveProcess extends Process<SaveFileCommand, String> {
    @Override
    String handle(SaveFileCommand command);
}
