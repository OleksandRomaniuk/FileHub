package com.teamdev.filehub.util;

/**
 * The exception that thrown during wrong database request.
 */
public class DataBaseException extends Exception{

    public DataBaseException(String message){
        super(message);
    }
}
