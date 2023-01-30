package com.teamdev.filehub.authentication;

import com.google.common.testing.NullPointerTester;
import com.teamdev.filehub.authenticateduser.AuthenticatedUserCommand;
import org.junit.jupiter.api.Test;

class AuthenticateUserCommandTest {

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(AuthenticatedUserCommand.class);
    }

}