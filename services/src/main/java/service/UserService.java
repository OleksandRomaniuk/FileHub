package service;
import dto.UserDTO;
import entities.tinytype.Email;
import entities.tinytype.UserId;

import java.util.Collection;

/**
 * Basic interface for user management
 */
public interface UserService {

    UserDTO findByEmail(Email email);

    UserDTO findById(UserId userId);

    Collection<UserDTO> findAll();

    void delete(UserId userId);

}
