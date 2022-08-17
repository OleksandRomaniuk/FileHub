package service.impl;

import com.google.common.base.Preconditions;
import dto.RegistrationDTO;
import dto.UserDTO;
import entities.User;
import entities.tinytype.Email;
import entities.tinytype.Password;
import entities.tinytype.UserId;
import reposirory.impl.UserRepository;
import service.RegistrationService;
import service.UserRegistrationException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegistrationServiceImpl implements RegistrationService{

        private static final String EMAIL_PATTERN =
                "^([A-Za-z0-9+_.-]+@[A-Za-z]+(\\.[A-Za-z]+)*\\.[A-Za-z]{2,})$";


    private final UserRepository userRepository = new UserRepository();


        @Override
        public UserId register(RegistrationDTO registrationDTO)
                throws UserRegistrationException {

            final String email = Preconditions.checkNotNull(registrationDTO.getEmail());
            final String password = Preconditions.checkNotNull(registrationDTO.getPassword());
            final String confirmPassword = Preconditions.checkNotNull(registrationDTO.getConfirmPassword());

            final Pattern pattern = Pattern.compile(EMAIL_PATTERN);
            final Matcher matcher = pattern.matcher(email);

            if (!matcher.matches()) {
                throw new UserRegistrationException("Invalid email format");
            }

            if (userRepository.findByEmail(email) != null) {

                throw new UserRegistrationException("User already exist");
            }

            if (!password.equals(confirmPassword)){
                throw new UserRegistrationException("Password does not match");
            }

            final User user = new User(new Email(email), new Password(password));

            return userRepository.add(user);

        }
}
