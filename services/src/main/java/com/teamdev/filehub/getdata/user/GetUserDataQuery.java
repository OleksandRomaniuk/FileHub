package com.teamdev.filehub.getdata.user;

import com.teamdev.filehub.authenticateduser.AuthenticatedUserQuery;
import com.teamdev.filehub.record.RecordId;

/**
 * The query from FileHub application for get data about user by id.
 */
public class GetUserDataQuery extends AuthenticatedUserQuery {

    public GetUserDataQuery(RecordId userId) {
        super(userId);
    }
}
