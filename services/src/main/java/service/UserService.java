package service;
import dto.LoginDTO;
import dto.RegistrationDTO;
import dto.SecurityTokenDTO;
import dto.UserDTO;
import entities.tinytype.Email;
import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserID;
import org.checkerframework.errorprone.checker.nullness.qual.NonNull;

import java.util.Collection;


/**
 * Basic interface for user management
 */
public interface UserService {

    /**
     * Registers new user
     * @param registrationDTO DTO with registration information
     * @return Id of registered user
     * @throws UserRegistrationException In case of error during registration
     */
    UserID register(RegistrationDTO registrationDTO)
            throws UserRegistrationException;

    /**
     * Searches for user by email
     * @param email Email of user to be found
     * @return DTO with user information
     */

    UserDTO findByEmail(@NonNull Email email);

    /**
     * Authorizes user into the system
     * @param loginDTO DTO with login information
     * @return Security token DTO for current user
     * @throws UserAuthenticationException In case of error during login
     */

    SecurityTokenDTO login(LoginDTO loginDTO)
            throws UserAuthenticationException;

    /**
     * Searches for user by id
     * @param userId Id of user to be found
     * @return DTO with user information
     */

    UserDTO findById(UserID userId);

    /**
     * Gets all registered users
     * @return Collection of DTOs with user information
     */

    Collection<UserDTO> findAll();

    /**
     * Delete user from repository by user id
     * @param userId Id of user to be deleted
     */

    void delete(UserID userId);


    /**
     * Searches for user by security token id
     * @param tokenId Security token id of user to be found
     * @return DTO with user information
     */
    UserDTO findUserByToken(SecurityTokenId tokenId);



}

