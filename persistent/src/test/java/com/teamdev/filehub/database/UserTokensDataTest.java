package com.teamdev.filehub.database;

import com.google.common.testing.NullPointerTester;
import com.teamdev.filehub.database.data.UserTokensData;
import org.junit.jupiter.api.Test;

class UserTokensDataTest {
    @Test
    void TestForNull() {
        new NullPointerTester().testAllPublicConstructors(UserTokensData.class);
    }
}