package com.teamdev.filehub.database;

import com.google.common.testing.NullPointerTester;
import com.teamdev.filehub.database.data.FileData;
import org.junit.jupiter.api.Test;

class FileDataTest {
    @Test
    void TestForNull() {
        new NullPointerTester().testAllPublicConstructors(FileData.class);
    }
}