package com.teamdev.filehub.registration;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.ProcessException;
import com.teamdev.filehub.ValidationException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;


class RegisterUserCommandTest {


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

        var expressionException
                = Assertions.assertThrows(ProcessException.class,
                () -> new RegisterUserCommand("aehandr@gmail.com", "pasw"));

        Assertions.assertEquals("Password should be more than 6 symbols.", expressionException.getMessage(),
                "Command do not validate password.");

    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(RegisterUserCommand.class);
    }


}
