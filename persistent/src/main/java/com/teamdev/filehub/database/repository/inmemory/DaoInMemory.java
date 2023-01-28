package com.teamdev.filehub.database.repository.inmemory;

import com.google.common.flogger.FluentLogger;
import com.teamdev.filehub.database.Table;
import com.teamdev.filehub.record.Record;
import com.teamdev.filehub.record.RecordId;
import com.teamdev.filehub.repository.EntityDao;

import java.util.List;
import java.util.Optional;

public abstract class DaoInMemory<E extends Record, T extends Table<E>> implements EntityDao<E, RecordId> {

    protected final T table;

    private static final FluentLogger logger = FluentLogger.forEnclosingClass();

    protected DaoInMemory(T table) {
        this.table = table;
    }

    @Override
    public List<E> findAll() {

        logger.atInfo().log("Read list of object: %s", table.getListOfObjects());

        return table.getListOfObjects();
    }

    @Override
    public Optional<E> read(RecordId id) {

        return table.readById(id.getId());
    }

    @Override
    public void create(E entity) {

        table.add(entity);

        logger.atInfo().log("Add : %s", entity);
    }

    @Override
    public E update(E entity) {

        table.update(entity);

        logger.atInfo().log("Update : %s", entity);

        return entity;
    }

    @Override
    public void delete(RecordId id) {

        logger.atInfo().log("Delete entity with id: %s", id);

        table.delete(id.getId());
    }
}
