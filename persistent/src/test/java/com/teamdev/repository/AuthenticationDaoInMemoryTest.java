package com.teamdev.repository;

import com.google.common.truth.Truth;
import com.teamdev.database.DataBase;
import com.teamdev.record.UserId;
import com.teamdev.record.UserTokensRecord;
import com.teamdev.util.QueryRequestException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.TimeZone;

class AuthenticationDaoInMemoryTest {

    private final String FILE_NAME =
            "C:\\Users\\38063\\IdeaProjects\\lessons\\FileHub\\persistent\\src\\main\\java\\com\\teamdev\\repository\\userTokens.json";


    @BeforeEach
    public void clearFile() {

        File file = new File(FILE_NAME);

        if (file.exists()) {

            try (FileWriter writer = new FileWriter(file)) {

                writer.write("");
            } catch (IOException e) {

                e.printStackTrace();
            }
        }
    }

    @Test
    public void createNewUserTokenTest() throws QueryRequestException {

        DataBase base = new DataBase();

        AuthenticationDaoInMemory dao = new AuthenticationDaoInMemory(base);

        dao.create(new UserTokensRecord(
                new UserId("test@gmail.com"),
                "tokenfbddfff",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES)));

        dao.create(new UserTokensRecord(
                new UserId("petr27@gmail.com"),
                "bvdfgfxdfvxcfvxc",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES)));

        dao.create(new UserTokensRecord(
                new UserId("ivan2872@gmail.com"),
                "bvdffvfvxcvfdfvxc",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES)));

        UserTokensRecord userTokensRecord = dao.readById("ivan2872@gmail.com");


        Truth.assertThat("bvdffvfvxcvfdfvxc").isEqualTo(userTokensRecord.getToken());

        // Assert.assertEquals(expected, new String(Files.readAllBytes(Paths.get(FILE_NAME))));
    }



    @Test
    public void deleteUserTest() throws QueryRequestException {

        DataBase base = new DataBase();

        AuthenticationDaoInMemory dao = new AuthenticationDaoInMemory(base);

        UserTokensRecord userFirst = new UserTokensRecord(
                new UserId("test@gmail.com"),
                "tokenfbddfff",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES));
        UserTokensRecord userSecond = new UserTokensRecord(
                new UserId("ivan2872@gmail.com"),
                "bvdffvfvxcvfdfvxc",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES));

        dao.create(userFirst);
        dao.create(userSecond);

        dao.delete(userFirst);

        UserTokensRecord userTokensRecord = dao.readById("test@gmail.com");

        Truth.assertThat(userTokensRecord).isEqualTo(null);

    }


}