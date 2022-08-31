package com.teamdev.newfolder;

import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;

public interface CreateFolderProcess extends Process<CreateFolderCommand, String> {
    @Override
    String handle(CreateFolderCommand command) throws ProcessException;
}
