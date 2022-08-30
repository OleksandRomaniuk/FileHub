package com.teamdev.database;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.database.user.UserData;
import org.junit.jupiter.api.Test;

class UserDataTest {

    @Test
    void evaluationUserData()  {
        UserData userData = new UserData("unina82@gmail.com", "unina82@gmail.com", "password453543");

        Truth.assertThat("unina82@gmail.com").isEqualTo(userData.getId());

        Truth.assertThat("unina82@gmail.com").isEqualTo(userData.getEmail());

        Truth.assertThat("password453543").isEqualTo(userData.getPassword());
    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(UserData.class);
    }

}