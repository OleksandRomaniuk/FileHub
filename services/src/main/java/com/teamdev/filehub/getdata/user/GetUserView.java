package com.teamdev.filehub.getdata.user;

import com.teamdev.filehub.View;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.authentication.AuthenticationException;
import com.teamdev.filehub.dto.UserInfo;
import com.teamdev.filehub.util.DownloadException;

import java.util.Optional;

/**
 * Represents an operation getting data about user from {@link GetUserDataQuery}
 * and returns {@link UserInfo}.
 */
@FunctionalInterface
public interface GetUserView extends View<GetUserDataQuery, Optional<UserInfo>> {
    @Override
    Optional<UserInfo> run(GetUserDataQuery query) throws DownloadException, AuthenticationException, UnauthorizedException;
}
