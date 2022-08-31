package com.teamdev.process;

import com.google.common.truth.Truth;
import com.teamdev.util.Command;
import com.teamdev.registration.RegisterUserCommand;
import com.teamdev.record.UserRecord;
import com.teamdev.registration.UserRegistrationProcess;
import com.teamdev.resourse.ApplicationContext;
import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;
import com.teamdev.util.QueryRequestException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import static com.teamdev.util.Hash.hashPassword;

class UserRegistrationProcessTest {

    ApplicationContext context = new ApplicationContext();

    private final String FILE_NAME = "C:\\Users\\38063\\IdeaProjects\\lessons\\FileHub\\persistent\\src\\main\\java\\com\\teamdev\\repository\\users.json";

    @BeforeEach
    public void clearFile() {

        File file = new File(FILE_NAME);

        if (file.exists()) {

            try (FileWriter writer = new FileWriter(file)) {

                writer.write("");
            } catch (IOException e) {

                e.printStackTrace();
            }
        }
    }

    @Test
    public void EvaluationOfCommand() throws ProcessException {


        Command userCommand = new RegisterUserCommand("test@mail.gmail", "password");

        Process process = context.getUserRegistrationProcess();

        process.handle(userCommand);

        Command userCommand2 = new RegisterUserCommand("petr@mail.gmail", "gtnjgfh48245");

        process.handle(userCommand2);

        UserRecord user = null;
        try {
            user = context.getUserDao().readById("test@mail.gmail");

        } catch (QueryRequestException e) {

            throw new ProcessException(e.getMessage());
        }

        Truth.assertThat(hashPassword("password")).isEqualTo(user.getPassword());

    }
}