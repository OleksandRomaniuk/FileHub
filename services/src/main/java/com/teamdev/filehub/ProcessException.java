package com.teamdev.filehub;

/**
 * Signals that an exception to some sort has occurred during the process.
 */
public class ProcessException extends Exception {

    public ProcessException(String message) {
        super(message);
    }
}
