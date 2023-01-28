package com.teamdev.filehub.authentication;

import com.google.common.base.Preconditions;
import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.record.Email;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.record.UserTokensRecord;
import com.teamdev.filehub.repository.AuthenticationDao;
import com.teamdev.filehub.repository.UserDao;
import com.teamdev.filehub.util.ConstTimeZone;
import com.teamdev.filehub.util.Hash;
import io.jsonwebtoken.Jwts;

import javax.annotation.ParametersAreNonnullByDefault;
import java.time.Clock;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

/**
 * The implementation of {@link AuthenticationProcess} for authentication users,
 * during which a temporary token is given.
 */
public class UserAuthenticationProcess implements AuthenticationProcess {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    private final UserDao inMemoryAllUsersDao;

    private final AuthenticationDao inMemoryUsersTokenDao;

    @ParametersAreNonnullByDefault
    public UserAuthenticationProcess(UserDao inMemoryAllUsersDao, AuthenticationDao inMemoryUsersTokenDao) {

        Preconditions.checkNotNull(inMemoryAllUsersDao);
        Preconditions.checkNotNull(inMemoryUsersTokenDao);

        this.inMemoryAllUsersDao = inMemoryAllUsersDao;
        this.inMemoryUsersTokenDao = inMemoryUsersTokenDao;

    }

    public static String generateJwt(String email) {

        return Jwts
                .builder()
                .setSubject(email)
                .setId(UUID.randomUUID().toString())
                .compact();
    }

    @ParametersAreNonnullByDefault
    @Override
    public String handle(AuthenticateUserCommand command) throws AuthenticationException {

        Optional<UserRecord> userRecord;

        userRecord = inMemoryAllUsersDao.readByEmail(new Email(command.getEmail()));

        if (userRecord.isEmpty()) {

            throw new AuthenticationException("Email or password is incorrect.");
        }

        UserRecord user = userRecord.get();

        logger.atInfo().log("userRecord = user");

        if (user.getPassword().equals(Hash.hashPassword(command.getPassword()))) {

            String jwt = generateJwt(command.getEmail());

            Clock clock = Clock.tickSeconds(ConstTimeZone.getTimeZone());

            LocalDateTime date2 = LocalDateTime.now(clock).plus(90, ChronoUnit.MINUTES);

            UserTokensRecord userTokensRecord = new UserTokensRecord(user.getId(), jwt, date2);

            Optional<UserTokensRecord> tokenInDB = inMemoryUsersTokenDao.read(user.getId());

            if (tokenInDB.isPresent()) {

                inMemoryUsersTokenDao.update(userTokensRecord);
            } else {

                inMemoryUsersTokenDao.create(userTokensRecord);
            }

            return userTokensRecord.getToken();

        } else {
            throw new AuthenticationException("Email or password is incorrect.");
        }
    }
}
