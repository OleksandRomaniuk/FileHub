package com.teamdev.filehub.dto;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * Data Transfer Object to represent data about user.
 */
public class UserInfo {

    String email;

    String rootFolderId;

    @ParametersAreNonnullByDefault
    public UserInfo(String email, String rootFolderId) {
        this.email = Preconditions.checkNotNull(email);
        this.rootFolderId = Preconditions.checkNotNull(rootFolderId);
    }

    public String getEmail() {
        return email;
    }

    public String getRootFolderId() {
        return rootFolderId;
    }
}
