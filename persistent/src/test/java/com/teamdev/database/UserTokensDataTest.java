package com.teamdev.database;

import com.google.common.testing.NullPointerTester;
import com.teamdev.database.userTokens.UserTokensData;
import org.junit.jupiter.api.Test;



class UserTokensDataTest {
    @Test
    void TestForNull() {
        new NullPointerTester().testAllPublicConstructors(UserTokensData.class);
    }
}