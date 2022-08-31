package com.teamdev.command;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.registration.RegisterUserCommand;
import org.junit.jupiter.api.Test;


class RegisterUserCommandTest {

    @Test
    void evaluationUserData() {
        RegisterUserCommand command = new RegisterUserCommand("test@gmail.com", "password453543");

        Truth.assertThat("test@gmail.com").isEqualTo(command.getEmail());
        Truth.assertThat("password453543").isEqualTo(command.getPassword());


    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(RegisterUserCommand.class);
    }


}