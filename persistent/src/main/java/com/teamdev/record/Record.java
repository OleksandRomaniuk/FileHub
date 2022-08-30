package com.teamdev.record;


import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

/**
 * The abstract class for any record for database
 */
public abstract class Record {

    protected UserId id;

    @ParametersAreNonnullByDefault
    public Record(UserId id) {

        Preconditions.checkNotNull(id);

        this.id = id;
    }


    public UserId getId() {
        return id;
    }

}
