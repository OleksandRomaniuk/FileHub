package service.impl;


import dto.*;
import entities.User;
import entities.tinytype.Email;
import entities.tinytype.UserId;
import reposirory.impl.UserRepository;
import service.UserService;
import java.util.ArrayList;
import java.util.Collection;


/**
 * Implementation of {@link UserService} interface
 */
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository = new UserRepository();

    @Override
    public UserDTO findByEmail(Email email) {

        final String userEmail = email.getEmail();

        final User user = userRepository.findByEmail(userEmail);

        return createUserDTOFromUser(user);

    }
    @Override
    public UserDTO findById(UserId userId) {

        final User user = userRepository.findById(userId);

        return createUserDTOFromUser(user);

    }

    @Override
    public Collection<UserDTO> findAll() {

        final Collection<User> users = userRepository.findAll();

        final Collection<UserDTO> userDTOList = new ArrayList<>();

        for (User user : users) {
            userDTOList.add(createUserDTOFromUser(user));
        }

        return userDTOList;

    }

    private static UserDTO createUserDTOFromUser(User user) {

        return new UserDTO(user.getId(), user.getEmail().getEmail());
    }
}
