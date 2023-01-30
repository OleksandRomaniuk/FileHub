package com.teamdev.filehub.database.data;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The base class for any type in database that holds id.
 */
public abstract class Data {
    private final String id;

    @ParametersAreNonnullByDefault
    public Data(String id) {

        Preconditions.checkNotNull(id);
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
