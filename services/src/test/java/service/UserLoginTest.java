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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

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
        final UserDTO loggedUser = userService.findUserByToken(tokenDTO.getTokenId());

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


    @Test
    public void workCorrectlyInMultipleThreads() throws Exception {

        final int threadPoolSize = 100;

        final CountDownLatch startLatch =
                new CountDownLatch(threadPoolSize);

        final ExecutorService executorService =
                Executors.newFixedThreadPool(threadPoolSize);

        final Set<UserId> uniqueUserIds = new HashSet<>();

        final Set<UserDTO> loggedUsers = new HashSet<>();

        final List<Future<UserDTO>> futureList = new ArrayList<>();

        for (int i = 0; i < threadPoolSize; i++) {

            final int currentIndex = i;

            final Future<UserDTO> future = executorService.submit(() -> {
                startLatch.countDown();
                startLatch.await();

                final String email = "User_" + currentIndex + "@user.com";
                final String password = "password_" + currentIndex;

                final UserId userId = userService.register(new RegistrationDTO(email, password, password));
                final UserDTO userDTO = userService.findById(userId);

                uniqueUserIds.add(userDTO.getUserId());

                Assertions.assertEquals(
                        email, userDTO.getEmail(),"Actual email of registered user does not equal expected.");

                final SecurityTokenDTO tokenDTO = userService.login(new LoginDTO(email, password));
                final UserDTO loggedUserDTO = userService.findUserByToken(tokenDTO.getTokenId());

                Assertions.assertEquals(
                        email, loggedUserDTO.getEmail(),"Actual email of logged user does not equal expected.");

                loggedUsers.add(loggedUserDTO);

                return userDTO;
            });

            futureList.add(future);
        }

        for (Future future: futureList) {

            future.get();
        }

        Assertions.assertEquals( threadPoolSize,
                userService.findAll().size(),"Users number must be " + threadPoolSize);

        Assertions.assertEquals(threadPoolSize,
                loggedUsers.size(),"Logged users number must be " + threadPoolSize);

        Assertions.assertEquals( threadPoolSize,
                uniqueUserIds.size(),"Ids are not unique");

        for (UserDTO userDTO : userService.findAll()) {
            userService.delete(userDTO.getUserId());
        }
    }




}


















