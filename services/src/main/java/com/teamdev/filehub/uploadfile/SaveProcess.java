package com.teamdev.filehub.uploadfile;

import com.teamdev.filehub.Process;

/**
 * The interface represents operation of upload file using {@link SaveFileCommand}.
 */
@FunctionalInterface
public interface SaveProcess extends Process<SaveFileCommand, String> {
    @Override
    String handle(SaveFileCommand command);
}
