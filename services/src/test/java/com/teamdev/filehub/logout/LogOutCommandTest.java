package com.teamdev.filehub.logout;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.Test;

class LogOutCommandTest {

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(LogOutCommand.class);
    }

}