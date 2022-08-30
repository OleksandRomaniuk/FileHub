package com.teamdev.record;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

public class FileRecord extends Record {

    private final String name;

    private final Double size;

    private final String extension;

    private final String idOfOwner;

    private final String idOfParentFolder;


    @ParametersAreNonnullByDefault
    public FileRecord(UserId id,
                      String name,
                      Double size,
                      String extension,
                      String idOfOwner,
                      String idOfParentFolder) {
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

    public String getIdOfOwner() {
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

    public String getIdOfParentFolder() {
        return idOfParentFolder;
    }
}
