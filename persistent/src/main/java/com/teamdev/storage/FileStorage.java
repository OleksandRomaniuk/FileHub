package com.teamdev.storage;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;
import java.io.*;
import java.util.Properties;

public class FileStorage {

    private FileInputStream fis;

    private Properties property = new Properties();

    private String root;

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

    @ParametersAreNonnullByDefault
    public void upload(InputStream content, String idFile) {


        Preconditions.checkNotNull(content);

        String rootPackage = root;


        File file = new File(rootPackage);

        if (!file.exists()) {

            file.mkdirs();

            file = new File(rootPackage + idFile);

            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            file = new File(rootPackage + idFile);
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

        String rootPackage = root + fileId;
        try {

            InputStream result = new FileInputStream(rootPackage);

            return result;

        } catch (FileNotFoundException e) {

            throw new RuntimeException();
        }
    }

    private static void copyInputStreamToFile(InputStream inputStream, File file)
            throws IOException {

        try (FileOutputStream outputStream = new FileOutputStream(file)) {

            inputStream.transferTo(outputStream);

        }
    }

    public String getRoot() {
        return root;
    }
}
