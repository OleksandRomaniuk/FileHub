package com.teamdev.database;

import com.google.common.base.Preconditions;
import com.google.common.flogger.FluentLogger;
import com.google.gson.Gson;
import com.teamdev.util.DataBaseException;

import javax.annotation.ParametersAreNonnullByDefault;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

public abstract class Table<S extends Data> {

    private final Class<S[]> clazz;

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    protected List<S> listOfObjects = new ArrayList<>();

    private final String FILE_NAME;

    Object lock = new Object();

    public Table(Class<S[]> clazz, String file_name) {
        this.clazz = clazz;
        FILE_NAME = file_name;
        // updateTable();
    }

    /**
     * Add object {@link S} into list and file.
     *
     * @param entity - the record of new object
     * @return added instance of {@link S}
     * @throws DataBaseException - if the entity with such id already exist.
     */
    @ParametersAreNonnullByDefault
    public S add(S entity) throws DataBaseException {

        Preconditions.checkNotNull(entity);

        synchronized (lock) {

            if (listOfObjects != null && containsId(entity.getId())) {
                throw new DataBaseException("The user with such id already exist.");
            }

            listOfObjects.add(entity);
        }

        writeJson(FILE_NAME, listOfObjects);

        return entity;
    }

    /**
     * Update old record with the new data.
     *
     * @param entity - object with updated data
     */
    @ParametersAreNonnullByDefault
    public void update(S entity) {
        Preconditions.checkNotNull(entity);

        S user;

        synchronized (lock) {

            if (containsId(entity.getId())) {
                if (readById(entity.getId()).isPresent()) {

                    user = readById(entity.getId()).get();

                    listOfObjects.remove(user);

                    listOfObjects.add(entity);

                }
            }
        }
        writeJson(FILE_NAME, listOfObjects);
    }

    /**
     * Find and check if  such record exist in table.
     *
     * @param id - id of searching entity
     * @return boolean value if such record exist in table
     */
    @ParametersAreNonnullByDefault
    public boolean containsId(String id) {

        Preconditions.checkNotNull(id);

        synchronized (lock) {
            return listOfObjects.stream().anyMatch(user -> user.getId().equals(id));
        }
    }

    /**
     * Delete entity by id.
     *
     * @param id
     * @throws DataBaseException - if entity with such id don't exist.
     */
    @ParametersAreNonnullByDefault
    public void delete(String id) throws DataBaseException {

        Preconditions.checkNotNull(id);

        //updateTable(FILE_NAME, listOfUsers);

        if (!containsId(id)) {
            throw new DataBaseException("The user with such id don't exist.");
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
     *
     * @param id - id of searching entity
     * @return optional value of {@link S}
     */
    @ParametersAreNonnullByDefault
    public Optional<S> readById(String id) {

        Preconditions.checkNotNull(id);

        return listOfObjects.stream().filter(ourUser -> ourUser.getId().equals(id)).findFirst();

    }


    protected void writeJson(String filePath, List<S> data) {

        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Gson gson = new Gson();

        File file = new File(filePath);


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
        } catch (NoSuchElementException e) {

        }
    }


    public List<S> getListOfObjects() {
        return listOfObjects;
    }
}
