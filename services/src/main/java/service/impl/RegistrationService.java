package service.impl;


import com.google.common.base.Preconditions;
import dto.RegistrationDTO;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Implementation of {@link UserService} interface
 */
public class RegistrationService {

    private final Logger log = LoggerFactory.getLogger(RegistrationService.class);

    private static final String EMAIL_PATTERN =
            "^([A-Za-z0-9+_.-]+@[A-Za-z]+(\\.[A-Za-z]+)*\\.[A-Za-z]{2,})$";

    private final UserRepository userRepository = new UserRepository();

    private final PasswordService passwordService = new PasswordService();

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
        String encryptPassword = passwordService.encrypt(password);

        final User user = new User(new Email(email), new Password(encryptPassword));

        try {
            return userRepository.add(user);
        } finally {

            if (log.isInfoEnabled()) {
                log.info("User successfully registered.");
            }
        }
    }
}

