package com.teamdev.authentication;

import com.google.common.base.Preconditions;
import com.teamdev.record.UserRecord;
import com.teamdev.record.UserTokensRecord;
import com.teamdev.repository.AuthenticationDao;
import com.teamdev.repository.UserDao;
import com.teamdev.resourse.ApplicationContext;
import com.teamdev.util.ConstTimeZone;
import com.teamdev.util.ProcessException;
import com.teamdev.util.QueryRequestException;
import io.jsonwebtoken.Jwts;

import javax.annotation.ParametersAreNonnullByDefault;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import static com.teamdev.util.Hash.hashPassword;

/**
 * The implementation of {@link AuthenticationProcess} for handling {@link AuthenticateUserCommand} and giving the right token.
 */
public class UserAuthenticationProcess implements AuthenticationProcess {

    private final UserDao inMemoryAllUsersDao;

    private final AuthenticationDao inMemoryUsersTokenDao;

    @ParametersAreNonnullByDefault
    public UserAuthenticationProcess(UserDao inMemoryAllUsersDao, AuthenticationDao inMemoryUsersTokenDao) {

        Preconditions.checkNotNull(inMemoryAllUsersDao);
        Preconditions.checkNotNull(inMemoryUsersTokenDao);

        this.inMemoryAllUsersDao = inMemoryAllUsersDao;
        this.inMemoryUsersTokenDao = inMemoryUsersTokenDao;

    }

    @ParametersAreNonnullByDefault
    @Override
    public String handle(AuthenticateUserCommand command) throws ProcessException {

        UserRecord userRecord = null;//берем из бд
        try {
            userRecord = inMemoryAllUsersDao.readByEmail(command.getEmail());
        } catch (QueryRequestException e) {
            throw new ProcessException(e.getMessage());
        }

        command.setPassword(hashPassword(command.getPassword()));

        if (userRecord != null && userRecord.getPassword().equals(command.getPassword())) {

            String jwt = generateJwt(command.getEmail());

            LocalDateTime date = LocalDateTime.now(ConstTimeZone.getTimeZone()).plus(90, ChronoUnit.MINUTES);

            UserTokensRecord userTokensRecord = new UserTokensRecord(userRecord.getId(), jwt, date);

            try {
                inMemoryUsersTokenDao.create(userTokensRecord);
            } catch (QueryRequestException e) {
                throw new ProcessException("we cannot create token");
            }

            return userTokensRecord.getId().getId();
        } else {
            throw new ProcessException("login or password is invalid");
        }
    }

    public static String generateJwt(String email) {

        return Jwts
                .builder()
                .setSubject(email)
                .setId(UUID.randomUUID().toString())
                .compact();
    }


}
