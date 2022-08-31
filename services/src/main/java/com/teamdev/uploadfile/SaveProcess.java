package com.teamdev.uploadfile;

import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;

/**
 * This interface for handling {@link SaveFileCommand} and saving file.
 */
public interface SaveProcess extends Process<SaveFileCommand, String> {
    @Override
    String handle(SaveFileCommand command) throws ProcessException;
}
