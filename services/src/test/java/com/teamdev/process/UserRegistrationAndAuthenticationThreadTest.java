package com.teamdev.process;

import com.google.common.flogger.FluentLogger;
import com.teamdev.registration.RegisterUserCommand;
import com.teamdev.record.UserId;
import com.teamdev.record.UserRecord;
import com.teamdev.registration.UserRegistrationProcess;
import com.teamdev.resourse.ApplicationContext;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

import static com.teamdev.util.Hash.hashPassword;


public class UserRegistrationAndAuthenticationThreadTest {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    ApplicationContext context = new ApplicationContext();



    @Test
    public void evaluationOfAuthentication() throws ExecutionException, InterruptedException {


        final List<Future<UserId>> futureList = new ArrayList<>();

        UserRegistrationProcess userService = context.getUserRegistrationProcess();

        final int threadPoolSize = 100;

        final CountDownLatch startLatch = new CountDownLatch(threadPoolSize);

        final ExecutorService executorService =
                Executors.newFixedThreadPool(threadPoolSize);

        for (int i = 0; i < threadPoolSize; i++) {

            final int currentIndex = i;

            final Future<UserId> future = executorService.submit(() -> {

                startLatch.countDown();
                startLatch.await();

                final String email = "User_" + currentIndex + "@user.com";
                final String password = "password_" + currentIndex;

                Thread.sleep(2000);
                final UserId userId = userService.handle(new RegisterUserCommand(email, password));

                logger.atInfo().log("We register user:: %s", userId);

                UserRecord userRecord = context.getUserDao().readById(email);

                Assertions.assertEquals(
                        hashPassword(password), userRecord.getPassword(),
                        "Actual password of registered user does not equal expected.");

                return userId;
            });
            futureList.add(future);
        }

        for (Future future : futureList) {

            future.get();
        }



        Assertions.assertEquals(threadPoolSize,
                context.getUserDao().read().size(),
                "Users number must be " + threadPoolSize);
    }


}
