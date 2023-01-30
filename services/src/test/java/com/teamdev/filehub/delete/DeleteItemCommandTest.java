package com.teamdev.filehub.delete;

import com.google.common.testing.NullPointerTester;
import com.teamdev.filehub.record.RecordId;
import org.junit.jupiter.api.Test;

class DeleteItemCommandTest {
    @Test
    void evaluationForNull() {
        NullPointerTester nullPointerTester = new NullPointerTester();
        nullPointerTester.setDefault(RecordId.class, new RecordId(""));
        nullPointerTester.testAllPublicConstructors(DeleteItemCommand.class);
    }
}
