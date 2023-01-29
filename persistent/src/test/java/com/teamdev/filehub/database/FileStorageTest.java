package com.teamdev.filehub.database;

import com.google.common.truth.Truth;
import com.teamdev.filehub.database.util.FileStorage;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.List;

class FileStorageTest {

    @TempDir
    File anotherTempDir;


    @Test
    void upload() throws IOException {

        FileInputStream fileInputStream = new FileInputStream("./src/test/resources/tempForFileStorage.txt");

        InputStream inputStream = fileInputStream;

        FileStorage fileStorage = new FileStorage(anotherTempDir.getPath());

        fileStorage.upload(inputStream, "tmp.txt");

        File letters = new File(anotherTempDir, "tmp.txt");

        List<String> strings = Files.readAllLines(letters.toPath());

        Truth.assertThat(strings.get(0)).isEqualTo("this is for test");


    }

    @Test
    void download() throws IOException {

        FileInputStream fileInputStream = new FileInputStream("./src/test/resources/tempForFileStorage.txt");

        InputStream inputStream = fileInputStream;


        FileStorage fileStorage = new FileStorage(anotherTempDir.getPath());

        fileStorage.upload(inputStream, "tmp.txt");

        InputStream download = fileStorage.download("tmp.txt");


        InputStream expected
                = new FileInputStream("./src/test/resources/tempForFileStorage.txt");

        boolean compareResult = IOUtils.contentEquals(download, expected);

        Truth.assertThat(compareResult).isEqualTo(true);

        anotherTempDir.delete();

    }

}