package service.impl;


import com.google.common.base.Preconditions;
import dto.*;
import entities.User;
import entities.tinytype.Email;
import entities.tinytype.Password;
import entities.tinytype.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reposirory.impl.UserRepository;
import service.UserRegistrationException;
import service.UserService;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Implementation of {@link UserService} interface
 */
public class UserServiceImpl implements UserService {

    private final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    private static final String EMAIL_PATTERN =
            "^([A-Za-z0-9+_.-]+@[A-Za-z]+(\\.[A-Za-z]+)*\\.[A-Za-z]{2,})$";

    private final UserRepository userRepository = new UserRepository();

    private final PasswordService passwordService = new PasswordService();


    @Override
    public UserId register(RegistrationDTO registrationDTO)
            throws UserRegistrationException {

        if (log.isInfoEnabled()) {
            log.info("Start registering new user...");
        }

        final String email = Preconditions.checkNotNull(registrationDTO.getEmail(),"Email cannot be null");
        final String password = Preconditions.checkNotNull(registrationDTO.getPassword(),"Password cannot be null");
        final String confirmPassword = Preconditions.checkNotNull(registrationDTO.getConfirmPassword(),"Confirmed password cannot be null");

        final Pattern pattern = Pattern.compile(EMAIL_PATTERN);
        final Matcher matcher = pattern.matcher(email);

        if (!matcher.matches()) {

            if (log.isWarnEnabled()) {
                log.warn("Invalid email format");
            }
            throw new UserRegistrationException("Invalid email format");
        }

        if (userRepository.findByEmail(email) != null) {

            if (log.isWarnEnabled()) {
                log.warn("Wrong message for already existing user");
            }
            throw new UserRegistrationException("Wrong message for already existing user");
        }

        if (!password.equals(confirmPassword)){

            if (log.isWarnEnabled()) {
                log.warn("Passwords must be equal");
            }

            throw new UserRegistrationException("Passwords must be equal");
        }
        String encryptPassword = null;
        try {
            encryptPassword = passwordService.encodePassword(password);

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
        }

        final User user = new User(new Email(email), new Password(encryptPassword));

        try {
            return userRepository.add(user);
        } finally {

            if (log.isInfoEnabled()) {
                log.info("User successfully registered.");
            }
        }
    }

    @Override
    public UserDTO findByEmail(Email email) {

        final String userEmail = email.getEmail();

        if (log.isInfoEnabled()) {
            log.info("Start looking for user with email: " + userEmail);
        }
        final User user = userRepository.findByEmail(userEmail);

        try {
            return createUserDTOFromUser(user);
        } finally {

            if (log.isInfoEnabled()) {
                log.info("User successfully found.");
            }
        }
    }

    @Override
    public UserDTO findById(UserId userId) {

        if (log.isInfoEnabled()) {
            log.info("Start looking for user with id: " + userId.getId());
        }

        final User user = userRepository.findById(userId);

        try {
            return createUserDTOFromUser(user);
        } finally {

            if (log.isInfoEnabled()) {
                log.info("User successfully found.");
            }
        }
    }



    @Override
    public Collection<UserDTO> findAll() {

        if (log.isInfoEnabled()) {
            log.info("Start looking for all registered users...");
        }

        final Collection<User> users = userRepository.findAll();

        final Collection<UserDTO> userDTOList = new ArrayList<>();

        for (User user : users) {
            userDTOList.add(createUserDTOFromUser(user));
        }

        try {
            return userDTOList;
        } finally {

            if (log.isInfoEnabled()) {
                log.info("Found " + userDTOList.size() + " users.");
            }
        }
    }



    @Override
    public void delete(UserId userId) {

        userRepository.delete(userId);

    }

    private static UserDTO createUserDTOFromUser(User user) {

        return new UserDTO(user.getId(), user.getEmail().getEmail());
    }
}

