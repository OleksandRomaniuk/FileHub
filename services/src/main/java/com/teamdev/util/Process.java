package com.teamdev.util;


/**
 * The interface for handling the command and representing service that makes changes to the persistent layer
 *
 * @param <S> type of {@link Command}
 * @param <K> type of returned value
 */
public interface Process<S extends Command, K> {

    K handle(S command) throws ProcessException;
}
