package com.teamdev.record;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.Test;


class FileRecordTest {
    @Test
    void TestForNull(){
        new NullPointerTester().setDefault(UserId.class, new UserId("")).testAllPublicConstructors(FileRecord.class);
    }
}