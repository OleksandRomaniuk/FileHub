package service;
import dto.LoginDTO;
import dto.RegistrationDTO;
import dto.SecurityTokenDTO;
import dto.UserDTO;
import entities.User;
import entities.tinytype.Email;
import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserId;

import java.util.Collection;
import java.util.Optional;

/**
 * Basic interface for user management
 */
public interface UserService {


    UserId register(RegistrationDTO registrationDTO)
            throws UserRegistrationException;

    UserDTO findByEmail(Email email);

    SecurityTokenDTO login(LoginDTO loginDTO)
            throws UserAuthenticationException;

    UserDTO findById(UserId userId);

    Collection<UserDTO> findAll();

    void delete(UserId userId);

    UserDTO findByToken(SecurityTokenId tokenId);

    void logout(SecurityTokenId tokenId);


}

