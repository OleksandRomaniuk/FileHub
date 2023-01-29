package com.teamdev.filehub.database;

import com.google.common.base.Preconditions;
import com.google.common.flogger.FluentLogger;
import com.google.gson.Gson;
import com.teamdev.filehub.record.Record;

import javax.annotation.ParametersAreNonnullByDefault;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * The abstract class for table in database with base methods for work with list of objects.
 * @param <S> type of object
 */
public abstract class Table<S extends Record> {

    private final Class<S[]> clazz;

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    protected List<S> listOfObjects = new ArrayList<>();

    private final String FILE_NAME;

    protected final Object lock = new Object();

    public Table(Class<S[]> clazz, String fileName) {
        this.clazz = clazz;
        FILE_NAME = fileName;
        // updateTable();
    }

    /**
     * Add object {@link S} into list and file.
     */
    @ParametersAreNonnullByDefault
    public S add(S entity) {

        Preconditions.checkNotNull(entity);

        synchronized (lock) {

            listOfObjects.add(entity);
        }

        writeJson(FILE_NAME, listOfObjects);

        return entity;
    }

    /**
     * Update old record with the new data.
     */
    @ParametersAreNonnullByDefault
    public void update(S entity) {
        Preconditions.checkNotNull(entity);

        S user;

        synchronized (lock) {

            if (containsId(entity.getId().getId())) {
                if (readById(entity.getId().getId()).isPresent()) {

                    user = readById(entity.getId().getId()).get();

                    listOfObjects.remove(user);

                    listOfObjects.add(entity);

                }
            }
        }
        writeJson(FILE_NAME, listOfObjects);
    }

    /**
     * Find and check if  such record exist in table.
     */
    @ParametersAreNonnullByDefault
    public boolean containsId(String id) {

        Preconditions.checkNotNull(id);

        synchronized (lock) {
            return listOfObjects.stream().anyMatch(user -> user.getId().getId().equals(id));
        }
    }

    /**
     * Delete entity by id.
     */
    @ParametersAreNonnullByDefault
    public void delete(String id) {

        Preconditions.checkNotNull(id);

        if (!containsId(id)) {
            throw new RuntimeException("User with such id don't exist: " + id);
        }

        S user;
        synchronized (lock) {

            if (readById(id).isPresent()) {

                user = readById(id).get();

                listOfObjects.remove(user);
            }
        }

        writeJson(FILE_NAME, listOfObjects);
    }

    /**
     * Find user with such email.
     */
    @ParametersAreNonnullByDefault
    public Optional<S> readById(String id) {

        Preconditions.checkNotNull(id);

        return listOfObjects.stream().filter(ourUser -> ourUser.getId().getId().equals(id)).findFirst();

    }


    protected void writeJson(String filePath, List<S> data) {

        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Gson gson = new Gson();

        File file = new File(filePath);

        if (!file.exists()){
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        if (file.exists()) {

            synchronized (lock) {
                try (FileWriter writer = new FileWriter(file)) {

                    writer.write("[");

                    ListIterator<S> iterator = data.listIterator();

                    while (iterator.hasNext()) {

                        writer.write(gson.toJson(iterator.next()));

                        if (iterator.hasNext()) {

                            writer.write(",");
                        }
                    }

                    writer.write("]");

                } catch (IOException e) {
                    logger.atWarning().log("error writing to json file following object: %s",
                            data);
                }
            }
        }
    }

    @ParametersAreNonnullByDefault
    protected void updateTable() {

        logger.atInfo().log("Upload data from file to list");

        File file = new File(FILE_NAME);

        try (Scanner scanner = new Scanner(file, StandardCharsets.UTF_8.name())) {

            Gson gson = new Gson();

            String dataLine = scanner.nextLine();

            logger.atInfo().log("We read from file: %s", dataLine);

            S[] resultList = gson.fromJson(dataLine, clazz);

            listOfObjects = Arrays.asList(resultList);


        } catch (FileNotFoundException e) {
            logger.atInfo().log("We did not find file ");
            throw new RuntimeException(e.getMessage());
        }
    }


    public List<S> getListOfObjects() {
        return listOfObjects;
    }
}
