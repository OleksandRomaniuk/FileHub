package com.teamdev.database;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;

public class Data {
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
