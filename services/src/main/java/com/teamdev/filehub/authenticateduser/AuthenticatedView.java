package com.teamdev.filehub.authenticateduser;

import com.teamdev.filehub.View;
import com.teamdev.filehub.record.RecordId;


@FunctionalInterface
public interface AuthenticatedView extends View<TokenDataQuery, RecordId> {
    @Override
    RecordId run(TokenDataQuery token) throws UnauthorizedException;
}
