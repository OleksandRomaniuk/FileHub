package com.teamdev.filehub;

import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.authentication.AuthenticationException;
import com.teamdev.filehub.util.DownloadException;

/**
 * Represents an operation that accepts Query and returns K.
 *
 * @param <S> {@link Query} implementation
 * @param <K> Response type
 */
@FunctionalInterface
public interface View<S extends Query, K> {
    K run(S query) throws DownloadException, AuthenticationException, UnauthorizedException;
}
