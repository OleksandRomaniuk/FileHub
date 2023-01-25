package com.teamdev.filehub.newfolder;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.Command;
import com.teamdev.filehub.util.ValidationException;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * This example demonstrates how to create new folder in the application.
 */
public class CreateFolderCommand implements Command {

    private final String name;
    private final String idOfOwner;
    private String idOfParentFolder;

    @ParametersAreNonnullByDefault
    public CreateFolderCommand(String name, String idOfParentFolder, String idOfOwner) throws ValidationException {

        this.name = Preconditions.checkNotNull(name);
        this.idOfParentFolder = Preconditions.checkNotNull(idOfParentFolder);
        this.idOfOwner = Preconditions.checkNotNull(idOfOwner);

        if (name.length() < 3) {
            throw new ValidationException("name", "length must be greater than 2 characters");
        }
    }

    @ParametersAreNonnullByDefault
    public CreateFolderCommand(String name, String idOfOwner) throws ValidationException {
        this.name = Preconditions.checkNotNull(name);

        if (name.length() < 3) {
            throw new ValidationException("name", "length must be greater than 2 characters");
        }
        this.idOfOwner = Preconditions.checkNotNull(idOfOwner);
    }

    public String getName() {
        return name;
    }

    public String getIdOfParentFolder() {
        return idOfParentFolder;
    }

    public String getIdOfOwner() {
        return idOfOwner;
    }
}
