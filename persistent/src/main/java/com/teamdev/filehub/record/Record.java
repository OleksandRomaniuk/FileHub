package com.teamdev.filehub.record;


import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The abstract class for any record for database
 */
public abstract class Record {

    protected RecordId id;

    @ParametersAreNonnullByDefault
    public Record(RecordId id) {

        Preconditions.checkNotNull(id);

        this.id = id;
    }


    public RecordId getId() {
        return id;
    }

    public void setId(RecordId id) {
        this.id = id;
    }
}
