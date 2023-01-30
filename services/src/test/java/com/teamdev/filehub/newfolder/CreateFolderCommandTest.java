package com.teamdev.filehub.newfolder;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.Test;

class CreateFolderCommandTest {

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(CreateFolderCommand.class);
    }

}