package entities;


import entities.tinytype.Email;
import entities.tinytype.Password;
import entities.tinytype.UserID;

/**
 * User entity implementation
 */
public class User implements Entity<UserID> {

    private UserID userId;
    private final Email email;
    private final Password password;

    @Override
    public UserID getId() {
        return userId;
    }

    @Override
    public void setId(UserID id) {
        this.userId = id;
    }

    public User(Email email, Password password) {
        this.email = email;
        this.password = password;
    }

    public Email getEmail() {
        return email;
    }

    public Password getPassword() {
        return password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (!userId.equals(user.userId)) return false;
        if (!email.equals(user.email)) return false;
        return password.equals(user.password);

    }

    @Override
    public int hashCode() {
        return userId.hashCode();
    }
}
