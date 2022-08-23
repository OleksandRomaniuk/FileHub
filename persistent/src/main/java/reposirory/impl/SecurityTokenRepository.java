package reposirory.impl;

import entities.SecurityToken;
import entities.User;
import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserId;
import reposirory.InMemoryRepository;

import java.util.Collection;
import java.util.concurrent.atomic.AtomicLong;

/**
 * {@link InMemoryRepository} implementation for authenticated users
 */
public class SecurityTokenRepository
        extends InMemoryRepository<SecurityTokenId, SecurityToken> {

    private AtomicLong idCounter = new AtomicLong(1);


    public SecurityToken findByUserId(UserId userId) {
        final Collection<SecurityToken> tokens = findAll();
        SecurityToken securityToken = null;

        for (SecurityToken currentSecurityToken : tokens) {
            if (currentSecurityToken.getUserId().equals(userId)) {
                securityToken = currentSecurityToken;
                break;
            }
        }

        return securityToken;
    }

    public SecurityTokenRepository() {
    }

    @Override
    protected SecurityTokenId generateId() {
        return new SecurityTokenId(idCounter.getAndIncrement());
    }


}
