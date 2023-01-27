package com.teamdev.filehub.database.storage;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

/**
 * Class that provides functionality for storing, and managing files.
 * This class is responsible for handling file operations such as uploading and downloading.
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

           // File file = new File("src/main/resources/text.txt");
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

    @ParametersAreNonnullByDefault
    public void upload(InputStream content, String idFile) {

        Preconditions.checkNotNull(content);

        if(root != null){

            String rootPackage = root + "\\" +idFile ;

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


        String rootPackage =  root + "\\" + fileId;

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
