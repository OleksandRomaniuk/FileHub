package com.teamdev.filehub.storage;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;
import java.io.*;
import java.util.Properties;

/**
 * Class that provides functionality for storing, and managing files.
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

        /*if (!file.exists()) {

            file.mkdirs();

            file = new File(rootPackage + idFile);

            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            file = new File(rootPackage + idFile);

        }*/

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

        if (file.delete()) {
            System.out.println("file.txt файл был удален с корневой папки проекта");
        } else System.out.println("Файл file.txt не был найден в корневой папке проекта");

    }

    public String getRoot() {
        return root;
    }
}
