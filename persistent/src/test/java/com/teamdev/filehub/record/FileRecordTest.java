package com.teamdev.filehub.record;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.Test;


class FileRecordTest {
    @Test
    void TestForNull(){
        new NullPointerTester().setDefault(RecordId.class, new RecordId("")).testAllPublicConstructors(FileRecord.class);
    }
}