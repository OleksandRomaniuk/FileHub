package com.teamdev.filehub.authentication;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.Test;

class AuthenticateUserCommandTest {

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(AuthenticateUserCommand.class);
    }

}