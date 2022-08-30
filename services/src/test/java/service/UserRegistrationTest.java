package service;

import dto.RegistrationDTO;
import dto.UserDTO;
import entities.tinytype.UserID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import service.impl.UserServiceImpl;
import static org.junit.jupiter.api.Assertions.fail;

public class UserRegistrationTest {


    private final UserService userService = new UserServiceImpl();

    private final String email = "user@test.com";
    private final String password = "password";

    @Test
    public void allowToCreateUser() throws UserRegistrationException {

        final UserID userId = userService.register(new RegistrationDTO(email, password, password));
        final UserDTO userDTO = userService.findById(userId);

        Assertions.assertEquals(email, userDTO.getEmail() , "Cant login user");

        userService.delete(userId);
    }

    @Test
    public void registrationOfAlreadyExistingUser() throws UserRegistrationException {

        final UserID userId = userService.register(new RegistrationDTO(email, password, password));
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

    @Test
    public void prohibitRegistrationOfUserWithInvalidEmail() {
        try {
            userService.register(new RegistrationDTO("user", password, password));
            fail("User with invalid email was registered.");
        } catch (UserRegistrationException ex) {
            Assertions.assertEquals("Invalid email format", ex.getMessage());
        }
    }

    @Test
    public void prohibitRegistrationOfUserWithDifferentPasswords() {

        try {
            userService.register(new RegistrationDTO(email, password, "pass"));
            fail("User with different passwords was registered.");
        } catch (UserRegistrationException ex) {
            Assertions.assertEquals("Passwords must be equal",
                    ex.getMessage());
        }
    }




}


















