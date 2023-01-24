package com.teamdev.filehub.registration;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.user.credentials.UserMariaCredentials;
import com.teamdev.filehub.ProcessException;
import com.teamdev.filehub.util.ValidationException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;


class RegisterUserCommandTest {

    @Test
    void evaluationUserData() throws ValidationException {

        UserMariaCredentials maria = new UserMariaCredentials();

        RegisterUserCommand command = new RegisterUserCommand(maria.getEmail(), maria.getPassword());

        Truth.assertThat(maria.getEmail()).isEqualTo(command.getEmail());

        Truth.assertThat(maria.getPassword()).isEqualTo(command.getPassword());

    }
    @Test
    void failedEmailValidation() {

        var expressionException
                = Assertions.assertThrows(ProcessException.class,
                () -> new RegisterUserCommand("tght", "testPassword"));

        Assertions.assertEquals("Wrong email.", expressionException.getMessage(),
                "Command do not validate email.");

    }

    @Test
    void failedPasswordValidation() {

        UserMariaCredentials maria = new UserMariaCredentials();


        var expressionException
                = Assertions.assertThrows(ProcessException.class,
                () -> new RegisterUserCommand(maria.getEmail(), "pasw"));

        Assertions.assertEquals("Password should be more than 6 symbols.", expressionException.getMessage(),
                "Command do not validate password.");

    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(RegisterUserCommand.class);
    }


}
