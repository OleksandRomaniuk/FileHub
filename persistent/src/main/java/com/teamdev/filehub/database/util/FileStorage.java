package com.teamdev.filehub.database.util;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;
import java.io.*;
import java.util.Properties;

/**
 * This example demonstrate  storing and managing files. Also, it
 * responsible for handling file operations such as uploading and downloading.
 */
public class FileStorage {

    private FileInputStream fis;

    private Properties property = new Properties();

    private String root;

    private File file;

    public FileStorage() {
        try {

            InputStream resourceAsStream =
                    getClass()
                            .getClassLoader()
                            .getResourceAsStream("application.properties");


            File file = new File("./src/main/resources/text.txt");

            copyInputStreamToFile(resourceAsStream, file);

            fis = new FileInputStream(file);

            property.load(fis);
        } catch (IOException e) {

            e.printStackTrace();
        }

        root = property.getProperty("storage.root");
    }

    public FileStorage(String path) {

        root = path;

    }

    private static void copyInputStreamToFile(InputStream inputStream, File file)
            throws IOException {

        try (FileOutputStream outputStream = new FileOutputStream(file)) {

            inputStream.transferTo(outputStream);

        }
    }

    @ParametersAreNonnullByDefault
    public void upload(InputStream content, String idFile) {

        Preconditions.checkNotNull(content);

        if (root != null) {

            String rootPackage = root + "\\" + idFile;

            file = new File(rootPackage);
        }

        try (OutputStream outputStream = new FileOutputStream(file)) {

            content.transferTo(outputStream);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @ParametersAreNonnullByDefault
    public InputStream download(String fileId) {

        Preconditions.checkNotNull(fileId);


        String rootPackage = root + "\\" + fileId;

        try {

            InputStream result = new FileInputStream(rootPackage);

            return result;

        } catch (FileNotFoundException e) {

            throw new RuntimeException();
        }
    }

    @ParametersAreNonnullByDefault
    public void delete(String name) {

        String pathToFile = root + "\\" + name;

        file = new File(pathToFile);

    }

    public String getRoot() {
        return root;
    }
}
