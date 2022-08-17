package reposirory.impl;

import entities.User;
import entities.tinytype.UserId;
import reposirory.InMemoryRepository;

import java.util.Collection;
import java.util.concurrent.atomic.AtomicLong;

/**
 * {@link InMemoryRepository} implementation for user entity
 */
public class UserRepository extends InMemoryRepository<UserId, User> {

    private AtomicLong idCounter = new AtomicLong(1);

    public UserRepository() {
    }
    public User findByEmail(String email) {
        final Collection<User> users = findAll();
        User user = null;

        for (User currentUser : users) {
            if (currentUser.getEmail().getEmail().equals(email)) {
                user = currentUser;
                break;
            }
        }

        return user;
    }

    @Override
    protected UserId generateId() {
        return new UserId(idCounter.getAndIncrement());
    }
}
