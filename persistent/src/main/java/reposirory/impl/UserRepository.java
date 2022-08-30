package reposirory.impl;

import entities.User;
import entities.tinytype.UserID;
import reposirory.InMemoryRepository;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * {@link InMemoryRepository} implementation for user entity
 */
public class UserRepository extends InMemoryRepository<UserID, User> {

    private final AtomicLong idCounter = new AtomicLong(1);

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
    protected UserID generateId() {
        return new UserID(idCounter.getAndIncrement());
    }


    @Override
    public void writeInFile(List<User> user) {

    }

    @Override
    public void updateFile(List<User> type) {

    }
}
