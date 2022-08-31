package com.teamdev.uploadfile;

import com.google.common.base.Preconditions;
import com.teamdev.util.Command;

import java.io.InputStream;

/**
 * The implementation of {@link Command} that holds information about file, id of user, who wants to upload this file
 * and path.
 */

public class SaveFileCommand implements Command {

    private final InputStream inputStream;

    private final String name;

    private final Double size;

    private final String extension;

    private final String idOfOwner;

    private final String idOfParentFolder;

    public SaveFileCommand(InputStream inputStream,
                           String name,
                           Double size,
                           String extension,
                           String idOfOwner,
                           String idOfParentFolder) {

        Preconditions.checkNotNull(inputStream);
        Preconditions.checkNotNull(name);
        Preconditions.checkNotNull(size);
        Preconditions.checkNotNull(extension);
        Preconditions.checkNotNull(idOfOwner);
        Preconditions.checkNotNull(idOfParentFolder);

        this.inputStream = inputStream;
        this.name = name;
        this.size = size;
        this.extension = extension;
        this.idOfOwner = idOfOwner;
        this.idOfParentFolder = idOfParentFolder;
    }


    public InputStream getInputStream() {
        return inputStream;
    }


    public String getName() {
        return name;
    }

    public Double getSize() {
        return size;
    }

    public String getExtension() {
        return extension;
    }

    public String getIdOfOwner() {
        return idOfOwner;
    }

    public String getIdOfParentFolder() {
        return idOfParentFolder;
    }
}
