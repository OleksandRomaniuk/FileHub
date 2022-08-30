package com.teamdev.repository;

import com.teamdev.util.QueryRequestException;

import java.util.List;

/**
 * A generic interface for data access objects that work with a single entity class.
 *
 * @param <T> The entity class.
 * @param <K> The identifier for searching.
 */
public interface EntityDao<T, K> {

    List<T> read();

    T readById(K identifier) throws QueryRequestException;

    void create(T entity) throws QueryRequestException;

    T update(T entity);

    T delete(T entity) throws QueryRequestException;

}
