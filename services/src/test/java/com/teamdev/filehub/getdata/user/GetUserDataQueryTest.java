package com.teamdev.filehub.getdata.user;

import com.google.common.testing.NullPointerTester;
import org.junit.jupiter.api.Test;

class GetUserDataQueryTest {
    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(GetUserDataQuery.class);
    }
}
