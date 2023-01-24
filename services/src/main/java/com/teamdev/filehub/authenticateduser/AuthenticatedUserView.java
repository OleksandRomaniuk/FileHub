package com.teamdev.filehub.authenticateduser;

import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserTokensRecord;
import com.teamdev.filehub.repository.AuthenticationDao;
import com.teamdev.filehub.util.ConstTimeZone;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Optional;

/**
 * The implementation of {@link AuthenticatedView} for check validity of token.
 */
public class AuthenticatedUserView implements AuthenticatedView {

    private final AuthenticationDao dao;

    public AuthenticatedUserView(AuthenticationDao dao) {
        this.dao = dao;
    }


    @Override
    public RecordId run(TokenDataQuery token) throws UnauthorizedException {

        Optional<UserTokensRecord> tokensRecord = dao.findByToken(token.getToken());

        if (tokensRecord.isPresent()) {

            LocalDateTime validity = tokensRecord.get().getValidity();

            Clock clock = Clock.tickSeconds(ConstTimeZone.getTimeZone());
            LocalDateTime nowDate = LocalDateTime.now(clock);

            if (nowDate.isBefore(validity)) {

                return tokensRecord.get().getId();
            }
        }
        throw new UnauthorizedException();
    }
}
