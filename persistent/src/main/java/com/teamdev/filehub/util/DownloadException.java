package com.teamdev.filehub.util;

/**
 * The exception that thrown during wrong download query.
 */
public class DownloadException extends Exception{

    public DownloadException(String message){
        super(message);
    }
}
