package com.teamdev.filehub.logout;

import com.google.common.testing.NullPointerTester;
import com.google.common.truth.Truth;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.AuthenticationDao;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class LogOutUserProcessTest {

    @Test
    public void evaluationOfAuthentication() {

        AuthenticationDao dao = Mockito.mock(AuthenticationDao.class);

        LogOutUserProcess logOutUserProcess = new LogOutUserProcess(dao);

        RecordId testUserId = new RecordId("userId");

        LogOutCommand command = new LogOutCommand(testUserId);

        RecordId handle = logOutUserProcess.handle(command);

        Truth.assertThat(handle).isEqualTo(testUserId);

        Mockito.verify(dao).delete(testUserId);
    }

    @Test
    void evaluationForNull() {
        new NullPointerTester().testAllPublicConstructors(LogOutUserProcess.class);
    }
}
