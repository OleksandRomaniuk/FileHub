package com.teamdev.filehub.util;

/**
 * The exception that thrown during wrong query request.
 */
public class QueryRequestException extends Exception{
    public QueryRequestException(String message){
        super(message);
    }
}
