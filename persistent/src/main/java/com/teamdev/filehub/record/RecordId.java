package com.teamdev.filehub.record;


import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.Objects;

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecordId recordId = (RecordId) o;
        return Objects.equals(id, recordId.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "UserId{" +
                "id='" + id + '\'' +
                '}';
    }
}
