package com.teamdev.downaldfile;


import com.teamdev.Query;

/**
 * The implementation of {@link Query} that holds information about file and owner of file.
 */
public class DownloadQuery implements Query {

    private final String fileId;

    private final String idOfOwner;


    public DownloadQuery(String fileId, String idOfOwner) {

        this.fileId = fileId;
        this.idOfOwner = idOfOwner;
    }


    public String getIdOfOwner() {
        return idOfOwner;
    }


    public String getFileId() {
        return fileId;
    }
}
