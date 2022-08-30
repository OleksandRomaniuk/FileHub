package com.teamdev.record;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.Test;



class UserIdTest {

    @Test
    void TestForNull(){
        new NullPointerTester().testAllPublicConstructors(UserId.class);
    }

}