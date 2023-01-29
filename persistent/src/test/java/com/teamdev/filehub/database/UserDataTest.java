package com.teamdev.filehub.database;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.database.data.UserData;
import org.junit.jupiter.api.Test;

class UserDataTest {

    @Test
    void evaluationUserData()  {
        UserData userData = new UserData("alex@gmail.com", "alex@gmail.com", "password453543");

        Truth.assertThat("alex@gmail.com").isEqualTo(userData.getId());

        Truth.assertThat("alex@gmail.com").isEqualTo(userData.getEmail());

        Truth.assertThat("password453543").isEqualTo(userData.getPassword());
    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(UserData.class);
    }

}