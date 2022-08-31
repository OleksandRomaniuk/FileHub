package com.teamdev.newfolder;

import com.teamdev.util.Command;

public class CreateFolderCommand implements Command {

    private final String name;

    private final String idOfParentFolder;

    private final String idOfOwner;


    public CreateFolderCommand(String name, String idOfParentFolder, String idOfOwner) {
        this.name = name;

        this.idOfParentFolder = idOfParentFolder;
        this.idOfOwner = idOfOwner;
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
