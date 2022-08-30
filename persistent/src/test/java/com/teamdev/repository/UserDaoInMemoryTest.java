package com.teamdev.repository;

import com.google.common.truth.Truth;
import com.teamdev.database.DataBase;
import com.teamdev.record.UserId;
import com.teamdev.record.UserRecord;
import com.teamdev.util.ProcessException;
import com.teamdev.util.QueryRequestException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

class UserDaoInMemoryTest {

    private final String FILE_NAME =
            "./src/main/resources/users.json";

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
    public void createNewUserTest() throws IOException, ProcessException {

        DataBase base = new DataBase();

        UserDaoInMemory dao = new UserDaoInMemory(base);

        try {
            dao.create(new UserRecord(new UserId("unina82@gmail.com"), "unina82@gmail.com", "password453543"));

        dao.create(new UserRecord(new UserId("test@gmail.com"), "test@gmail.com", "bfdbfrbhf852"));

        } catch (QueryRequestException e) {
            throw new ProcessException(e.getMessage());
        }

        String expected = "[{\"email\":\"unina82@gmail.com\",\"password\":\"password453543\",\"id\":\"unina82@gmail.com\"},{\"email\":\"test@gmail.com\",\"password\":\"bfdbfrbhf852\",\"id\":\"test@gmail.com\"}]";

        Truth.assertThat(new String(Files.readAllBytes(Paths.get(FILE_NAME)))).isEqualTo( expected);
    }

    @Test
    public void findNewUserTest() throws QueryRequestException {

        DataBase base = new DataBase();

        UserDaoInMemory dao = new UserDaoInMemory(base);

        dao.create(new UserRecord(new UserId("unina82@gmail.com"), "unina82@gmail.com", "password453543"));

        dao.create(new UserRecord(new UserId("test@gmail.com"), "test@gmail.com", "bfdbfrbhf852"));

        UserRecord userRecord = dao.readById("unina82@gmail.com");

        String expected = "unina82@gmail.com";

        Truth.assertThat(expected).isEqualTo(userRecord.getId().getId());
    }

    @Test
    public void deleteUserTest() throws QueryRequestException{

        DataBase base = new DataBase();

        UserDaoInMemory dao = new UserDaoInMemory(base);

        UserRecord userFirst
                = new UserRecord(new UserId("unina82@gmail.com"), "unina82@gmail.com", "password453543");

        UserRecord userSecond
                = new UserRecord(new UserId("test@gmail.com"), "test@gmail.com", "bfdbfrbhf852");

        dao.create(userFirst);

        dao.create(userSecond);

        UserRecord userData = dao.delete(userFirst);

        Truth.assertThat(userFirst).isEqualTo(userData);
    }

    @Test
    void CreateAlreadyExistUser() throws QueryRequestException {

        DataBase base = new DataBase();

        UserDaoInMemory dao = new UserDaoInMemory(base);

        UserRecord userFirst
                = new UserRecord(new UserId("unina82@gmail.com"), "unina82@gmail.com", "password453543");

        UserRecord userSecond
                = new UserRecord(new UserId("test@gmail.com"), "test@gmail.com", "bfdbfrbhf852");

        dao.create(userFirst);

        dao.create(userSecond);

        var expressionException
                = Assertions.assertThrows(QueryRequestException.class, () -> dao.create(userFirst));

        Assertions.assertEquals("The user with such id already exist.", expressionException.getMessage(), "already created user.");
    }

    @Test
    void deleteNonExistUser() throws QueryRequestException {

        DataBase base = new DataBase();

        UserDaoInMemory dao = new UserDaoInMemory(base);

        UserRecord userFirst
                = new UserRecord(new UserId("unina82@gmail.com"), "unina82@gmail.com", "password453543");

        UserRecord userSecond
                = new UserRecord(new UserId("test@gmail.com"), "test@gmail.com", "bfdbfrbhf852");

        dao.create(userFirst);

        dao.create(userSecond);

        var expressionException
                = Assertions.assertThrows(QueryRequestException.class,
                () -> dao.delete(
                        new UserRecord(
                                new UserId("tbfdgfd@gmail.com"),
                                "tbfdgfd@gmail.com"
                                , "password453543")));

        Assertions.assertEquals("The user with such id don't exist.", expressionException.getMessage(), "already created user.");
    }

}