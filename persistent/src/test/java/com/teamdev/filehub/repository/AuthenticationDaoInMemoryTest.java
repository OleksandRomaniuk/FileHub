package com.teamdev.filehub.repository;

import com.google.common.truth.Truth;
import com.teamdev.filehub.database.DataBase;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.record.UserTokensRecord;
import com.teamdev.filehub.repository.inmemory.AuthenticationDaoInMemory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.TimeZone;

class AuthenticationDaoInMemoryTest {

    private final String FILE_NAME =
            "C:\\Users\\Oleksandr\\Desktop\\tests\\userTokens.json";


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
    public void createNewUserTokenTest() {

        DataBase base = new DataBase();

        AuthenticationDaoInMemory dao = new AuthenticationDaoInMemory(base);

        dao.create(new UserTokensRecord(
                new RecordId("alex@gmail.com"),
                "tokenfbddfff",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES)));

        dao.create(new UserTokensRecord(
                new RecordId("qwerty@gmail.com"),
                "bvdfgfxdfvxcfvxc",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES)));

        dao.create(new UserTokensRecord(
                new RecordId("ivan2872@gmail.com"),
                "bvdffvfvxcvfdfvxc",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES)));

        Optional<UserTokensRecord> userTokensRecord = dao.read(new RecordId("ivan2872@gmail.com"));


        Truth.assertThat("bvdffvfvxcvfdfvxc").isEqualTo(userTokensRecord.get().getToken());

    }



    @Test
    public void deleteUserTest() {

        DataBase base = new DataBase();

        AuthenticationDaoInMemory dao = new AuthenticationDaoInMemory(base);

        UserTokensRecord userFirst = new UserTokensRecord(
                new RecordId("alex@gmail.com"),
                "tokenfbddfff",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES));
        UserTokensRecord userSecond = new UserTokensRecord(
                new RecordId("ivan2872@gmail.com"),
                "bvdffvfvxcvfdfvxc",
                LocalDateTime.now(
                        TimeZone.getTimeZone("Europe/Kiev").toZoneId()).plus(90, ChronoUnit.MINUTES));

        dao.create(userFirst);
        dao.create(userSecond);

        dao.delete(userFirst.getId());

        Optional<UserTokensRecord> userTokensRecord = dao.read(new RecordId("alex@gmail.com"));


        Truth.assertThat(userTokensRecord.isEmpty()).isEqualTo(true);

    }


}