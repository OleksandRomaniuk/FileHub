package com.teamdev.filehub.registration;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.Process;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.user.credentials.UserMariaCredentials;
import com.teamdev.filehub.user.credentials.UserPetrCredentials;
import com.teamdev.filehub.Command;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.resourse.ApplicationContextInMemory;
import com.teamdev.filehub.ProcessException;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static com.teamdev.filehub.util.Hash.hashPassword;

class UserRegistrationProcessTest {

    private final ApplicationContextInMemory context = new ApplicationContextInMemory();

    private final UserMariaCredentials maria = new UserMariaCredentials();

    private final UserPetrCredentials petr = new UserPetrCredentials();


    @Test
    public void EvaluationOfCommand() throws ProcessException {


        Command userCommand = new RegisterUserCommand(maria.getEmail(), maria.getPassword());

        Process process = context.getUserRegistrationProcess();

        process.handle(userCommand);

        Command userCommand2 = new RegisterUserCommand(petr.getEmail(), petr.getPassword());

        process.handle(userCommand2);

        Optional<UserRecord> user = context.getUserDao().read((new RecordId(maria.getEmail())));

        Truth.assertThat(hashPassword(maria.getPassword())).isEqualTo(user.get().getPassword());

    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(UserRegistrationProcess.class);
    }
}
