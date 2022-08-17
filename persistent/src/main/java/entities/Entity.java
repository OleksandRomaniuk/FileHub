package entities;

import entities.tinytype.EntityId;

/**
 * Abstract entity interface
 */
public interface Entity<TypeId extends EntityId> {

    TypeId getId();

    void setId(TypeId id);
}
