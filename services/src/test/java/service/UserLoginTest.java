package service;

import dto.LoginDTO;
import dto.RegistrationDTO;
import dto.SecurityTokenDTO;
import dto.UserDTO;
import entities.tinytype.Email;
import entities.tinytype.UserId;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import service.impl.UserServiceImpl;

import static org.junit.jupiter.api.Assertions.fail;

public class UserLoginTest {


    private final UserService userService = new UserServiceImpl();

    private final String email = "user@test.com";
    private final String password = "password";

    @Test
    public void allowRegisteredUserToLogin()
            throws UserRegistrationException, UserAuthenticationException {

        final UserId userId =
                userService.register(new RegistrationDTO(email, password, password));

        final SecurityTokenDTO tokenDTO = userService.login(new LoginDTO(email, password));
        final UserDTO loggedUser = userService.findByToken(tokenDTO.getTokenId());

        Assertions.assertEquals(
                email, loggedUser.getEmail(),"Actual email of logged user does not equal expected.");

        userService.delete(userId);
    }

    @Test
    public void prohibitLoginOfNotRegisteredUser() {

        try {
            userService.login(new LoginDTO(email, password));
            fail("Not registered user logged in.");
        } catch (UserAuthenticationException ex) {
            Assertions.assertEquals("Incorrect credentials",
                     ex.getMessage());
        }
    }

    @Test
    public void prohibitLoginOfUserWithIncorrectPassword()
            throws UserRegistrationException {

        final UserId userId =
                userService.register(new RegistrationDTO(email, password, password));
        final UserDTO userDTO = userService.findByEmail(new Email(email));

        Assertions.assertEquals(
                email, userDTO.getEmail(),"Actual email of registered user does not equal expected.");

        try {
            userService.login(new LoginDTO(email, "pass"));
            fail("User with incorrect password logged in.");
        } catch (UserAuthenticationException ex) {
            Assertions.assertEquals(
                    "Incorrect credentials", ex.getMessage(),"Wrong message for incorrect password.");

            userService.delete(userId);
        }
    }


}


















