package service;
import dto.RegistrationDTO;
import dto.UserDTO;
import entities.User;
import entities.tinytype.Email;
import entities.tinytype.UserId;

import java.util.Collection;

/**
 * Basic interface for user management
 */
public interface UserService {


    UserId register(RegistrationDTO registrationDTO)
            throws UserRegistrationException;

    UserDTO findByEmail(Email email);


    UserDTO findById(UserId userId);

    Collection<UserDTO> findAll();

    void delete(UserId userId);
}

