package com.teamdev.filehub.registration;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.Command;
import com.teamdev.filehub.Process;
import com.teamdev.filehub.ProcessException;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.resourse.ApplicationContextInMemory;
import org.junit.jupiter.api.Test;
import java.util.Optional;
import static com.teamdev.filehub.Hash.hashPassword;


class UserRegistrationProcessTest {

    private final ApplicationContextInMemory context = new ApplicationContextInMemory();

    @Test
    public void EvaluationOfCommand() throws ProcessException {


        Command userCommand = new RegisterUserCommand("aehandr@gmail.com", "passworAAAAx");

        Process process = context.getUserRegistrationProcess();

        process.handle(userCommand);

        Command userCommand2 = new RegisterUserCommand("aehandr@gmail.com", "passworAAAAx");

        process.handle(userCommand2);

        Optional<UserRecord> user = context.getUserDao().read((new RecordId("aehandr@gmail.com")));

        Truth.assertThat(hashPassword("aehandr@gmail.com")).isEqualTo(user.get().getPassword());

    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(UserRegistrationProcess.class);
    }
}
