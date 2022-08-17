package service;

import dto.RegistrationDTO;
import dto.UserDTO;
import entities.User;
import entities.tinytype.UserId;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import service.impl.UserServiceImpl;


public class RegistrationServiceTest {


    private final UserService userService = new UserServiceImpl();

    private final String email = "user@test.com";
    private final String password = "password";

    @Test
    public void allowToCreateNewUser() throws UserRegistrationException {

        final UserId userId = userService.register(new RegistrationDTO(email, password, password));
        final UserDTO userDTO = userService.findById(userId);

        Assertions.assertEquals(email, userDTO.getEmail() , "Actual email of registered user does not equal expected.");

        userService.delete(userId);
    }

    @Test
    public void registrationOfAlreadyExistingUser()
            throws UserRegistrationException {

        final UserId userId = userService.register(new RegistrationDTO(email, password, password));
        final UserDTO userDTO = userService.findById(userId);

        Assertions.assertEquals(email, userDTO.getEmail() , "Actual email of registered user does not equal expected.");

        try {
            userService.register(new RegistrationDTO(email, password, password));
        } catch (UserRegistrationException ex) {
            Assertions.assertEquals("Wrong message for already existing user",
                    ex.getMessage());

            userService.delete(userId);
        }
    }

}
