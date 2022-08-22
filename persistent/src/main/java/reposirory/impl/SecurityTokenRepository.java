package reposirory.impl;

import entities.SecurityToken;
import entities.tinytype.SecurityTokenId;
import reposirory.InMemoryRepository;

import java.util.concurrent.atomic.AtomicLong;

/**
 * {@link InMemoryRepository} implementation for authenticated users
 */
public class SecurityTokenRepository
        extends InMemoryRepository<SecurityTokenId, SecurityToken> {

    private AtomicLong idCounter = new AtomicLong(1);

    public SecurityTokenRepository() {
    }

    @Override
    protected SecurityTokenId generateId() {
        return new SecurityTokenId(idCounter.getAndIncrement());
    }
}
