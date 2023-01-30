package com.teamdev.filehub.registration;


import com.google.common.base.Preconditions;
import com.teamdev.filehub.record.Email;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.repository.UserDao;

import javax.annotation.ParametersAreNonnullByDefault;
import javax.validation.constraints.NotNull;
import java.util.Optional;

import static com.teamdev.filehub.Hash.hashPassword;

/**
 * Represents an operation for creating new user in the system.
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
    public RecordId handle(@NotNull RegisterUserCommand command) throws UserAlreadyRegisteredException {

        String email = command.getEmail();

        String password = hashPassword(command.getPassword());

        RecordId recordId = new RecordId(email);

        Optional<UserRecord> user = userDao.readByEmail(new Email(email));

        if (user.isPresent()) {
            throw new UserAlreadyRegisteredException("such email already registered");
        }

        UserRecord userRecord = new UserRecord(new RecordId(email), email, password);

        userDao.create(userRecord);

        folderDao.create(new FolderRecord(new RecordId(email + "Root"), "root", email));

        return recordId;
    }
}
