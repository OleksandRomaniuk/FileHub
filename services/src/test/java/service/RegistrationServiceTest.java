package service;

import dto.RegistrationDTO;
import dto.UserDTO;
import entities.tinytype.UserId;
import org.junit.Test;
import service.impl.RegistrationServiceImpl;
import service.impl.UserServiceImpl;
import static org.junit.Assert.assertEquals;


public class RegistrationServiceTest {

    private final UserService userService = new UserServiceImpl();
    private final RegistrationService registrationService = new RegistrationServiceImpl();


    private final String email = "user@test.com";
    private final String password = "password";

    @Test
    public void allowToCreateNewUser() throws UserRegistrationException {
        final UserId userId = registrationService.register(new RegistrationDTO(email, password, password));
        final UserDTO userDTO = userService.findById(userId);

        assertEquals("Actual email of registered user does not equal expected.",
                email, userDTO.getEmail());

    }
}

