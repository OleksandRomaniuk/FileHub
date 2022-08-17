package reposirory;



import entities.Entity;
import entities.tinytype.EntityId;

import java.util.Collection;

/**
 * Basic interface for CRUD operations
 */
interface Repository<TypeId extends EntityId, Type extends Entity> {

    TypeId add(Type type);

    Type findById(TypeId typeId);

    Collection<Type> findAll();

    void delete(TypeId typeId);
}
