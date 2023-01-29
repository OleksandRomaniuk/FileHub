package com.teamdev.filehub.database.data;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * Holds all information about file for database
 */
public class FileData extends Data {

    //private String id;
    private final String name;

    private final Double size;

    private final String extension;

    private final String idOfParentFolder;

    private final String idOfOwner;

    @ParametersAreNonnullByDefault
    public FileData(String id,
                    String name,
                    Double size,
                    String extension,
                    String idOfParentFolder,
                    String idOfOwner
    ) {


        super(id);

        Preconditions.checkNotNull(name);
        Preconditions.checkNotNull(size);
        Preconditions.checkNotNull(extension);
        Preconditions.checkNotNull(idOfOwner);
        Preconditions.checkNotNull(idOfParentFolder);
        this.name = name;
        this.size = size;
        this.extension = extension;
        this.idOfOwner = idOfOwner;
        this.idOfParentFolder = idOfParentFolder;
    }

    public String getIfOfOwner() {
        return idOfOwner;
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
