package com.teamdev.filehub.getdata.user;

import com.teamdev.filehub.authenticateduser.AuthenticatedUserQuery;
import com.teamdev.filehub.record.RecordId;

/**
 * The query for getting data about user by id.
 */
public class UserDataQuery extends AuthenticatedUserQuery {

    public UserDataQuery(RecordId userId) {
        super(userId);
    }
}
