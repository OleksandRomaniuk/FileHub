package com.teamdev.filehub.getdata.user;

import com.teamdev.filehub.View;
import com.teamdev.filehub.authenticateduser.UnauthorizedException;
import com.teamdev.filehub.authentication.AuthenticationException;
import com.teamdev.filehub.dto.UserInfo;
import com.teamdev.filehub.util.DownloadException;

import java.util.Optional;

/**
 * Represents an operation getting data about user
 */
@FunctionalInterface
public interface UserView extends View<UserDataQuery, Optional<UserInfo>> {
    @Override
    Optional<UserInfo> run(UserDataQuery query) throws DownloadException, AuthenticationException, UnauthorizedException;
}
