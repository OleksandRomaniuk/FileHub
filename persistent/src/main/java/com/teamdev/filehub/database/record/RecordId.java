package com.teamdev.filehub.database.record;


import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The tiny type for user id.
 */
public class RecordId {

    private final String id;

    @ParametersAreNonnullByDefault
    public RecordId(String id) {
        Preconditions.checkNotNull(id);

        this.id = id;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return "UserId{" +
                "id='" + id + '\'' +
                '}';
    }
}
