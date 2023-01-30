package com.teamdev.filehub.process;

import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.Hash;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.registration.RegisterUserCommand;
import com.teamdev.filehub.registration.UserRegistrationProcess;
import com.teamdev.filehub.resourse.ApplicationContextInMemory;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.*;


public class UserThreadTest {

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    ApplicationContextInMemory context = new ApplicationContextInMemory();


    @Test
    public void evaluationOfAuthentication() throws ExecutionException, InterruptedException {


        final List<Future<RecordId>> futureList = new ArrayList<>();

        UserRegistrationProcess userService = context.getUserRegistrationProcess();

        final int threadPoolSize = 100;

        final CountDownLatch startLatch = new CountDownLatch(threadPoolSize);

        final ExecutorService executorService =
                Executors.newFixedThreadPool(threadPoolSize);

        for (int i = 0; i < threadPoolSize; i++) {

            final int currentIndex = i;

            final Future<RecordId> future = executorService.submit(() -> {

                startLatch.countDown();
                startLatch.await();

                final String email = "User_" + currentIndex + "@user.com";
                final String password = "password_" + currentIndex;

                Thread.sleep(2000);
                final RecordId recordId = userService.handle(new RegisterUserCommand(email, password));

                logger.atInfo().log("We register user:: %s", recordId);

                Optional<UserRecord> userRecord = context.getUserDao().read(new RecordId(email));

                Assertions.assertEquals(
                        Hash.hashPassword(password), userRecord.get().getPassword(),
                        "Actual password of registered user does not equal expected.");

                return recordId;
            });
            futureList.add(future);
        }

        for (Future future : futureList) {

            future.get();
        }


        Assertions.assertEquals(threadPoolSize,
                context.getUserDao().findAll().size(),
                "Users number must be " + threadPoolSize);
    }


}
