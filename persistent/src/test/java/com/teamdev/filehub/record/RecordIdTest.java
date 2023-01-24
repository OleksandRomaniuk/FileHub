package com.teamdev.filehub.record;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.Test;



class RecordIdTest {

    @Test
    void TestForNull(){
        new NullPointerTester().testAllPublicConstructors(RecordId.class);
    }

}