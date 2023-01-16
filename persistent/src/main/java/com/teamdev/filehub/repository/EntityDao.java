package com.teamdev.filehub.repository;

import java.util.List;
import java.util.Optional;

/**
 * A generic interface for data access objects that work with a single entity class.
 *
 * @param <T> The entity class.
 * @param <K> The identifier for searching.
 */
public interface EntityDao<T, K> {

    List<T> findAll();

    Optional<T> read(K id);

    void create(T entity);

    T update(T entity);

    void delete(K id);

}
