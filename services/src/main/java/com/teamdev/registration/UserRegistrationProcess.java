package com.teamdev.registration;


import com.google.common.base.Preconditions;
import com.teamdev.record.EmailValidator;
import com.teamdev.record.FolderRecord;
import com.teamdev.record.UserId;
import com.teamdev.record.UserRecord;
import com.teamdev.repository.FolderDao;
import com.teamdev.repository.UserDao;
import com.teamdev.util.*;

import javax.annotation.ParametersAreNonnullByDefault;
import javax.validation.constraints.NotNull;

import java.time.LocalDateTime;

import static com.teamdev.util.Hash.hashPassword;

/**
 * The implementation of {@link RegistrationProcess} for handling {@link RegisterUserCommand} and adding new user in the database.
 */
public class UserRegistrationProcess implements RegistrationProcess {

    private final UserDao userDao;

    private final FolderDao folderDao;

    @ParametersAreNonnullByDefault
    public UserRegistrationProcess(UserDao dao, FolderDao folderDao) {

        Preconditions.checkNotNull(dao);
        Preconditions.checkNotNull(folderDao);

        this.folderDao = folderDao;

        this.userDao = dao;
    }

    @ParametersAreNonnullByDefault
    @Override
    public UserId handle(@NotNull RegisterUserCommand command) throws ProcessException {

        String email = command.getEmail();

        String password = hashPassword(command.getPassword());

        try {
            if (!EmailValidator.validate(email)) {
                throw new ValidationException("Wrong email.");
            }

            UserId userId = new UserId(email);

            UserRecord userRecord = new UserRecord(new UserId(email), email, password);

            userDao.create(userRecord);

            return userId;
        } catch (ValidationException | QueryRequestException e) {
            throw new ProcessException(e.getMessage());
        }

    }


}
