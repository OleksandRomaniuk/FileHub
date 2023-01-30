package com.teamdev.filehub.savefile;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.Test;

class SaveFileCommandTest {

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(SaveFileCommand.class);
    }

}