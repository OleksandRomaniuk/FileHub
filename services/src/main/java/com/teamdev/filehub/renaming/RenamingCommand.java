package com.teamdev.filehub.renaming;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.Command;
import com.teamdev.filehub.ValidationException;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * Data for new name of file or folder
 */
public class RenamingCommand implements Command {

    private final String itemId;

    private final String newName;

    @ParametersAreNonnullByDefault
    public RenamingCommand(String itemId, String newName) throws ValidationException {
        this.itemId = Preconditions.checkNotNull(itemId);
        this.newName = Preconditions.checkNotNull(newName);

        if (newName.length() < 3) {
            throw new ValidationException("name", "length must be greater than 2 characters");
        }
    }

    public String getItemId() {
        return itemId;
    }

    public String getNewName() {
        return newName;
    }
}
