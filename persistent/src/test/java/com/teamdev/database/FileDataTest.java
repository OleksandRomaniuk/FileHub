package com.teamdev.database;

import com.google.common.testing.NullPointerTester;
import com.teamdev.database.file.FileData;
import org.junit.jupiter.api.Test;

class FileDataTest {
    @Test
    void TestForNull() {
        new NullPointerTester().testAllPublicConstructors(FileData.class);
    }
}