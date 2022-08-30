package entities;


import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserID;

import java.time.LocalDateTime;

/**
 * Security token entity implementation
 */
public class SecurityToken implements Entity<SecurityTokenId> {

    private SecurityTokenId tokenId;

    private final UserID userId;

    private LocalDateTime expireTime;

    public SecurityToken(UserID userId) {
        this.userId = userId;
    }

    @Override
    public SecurityTokenId getId() {
        return tokenId;
    }

    @Override
    public void setId(SecurityTokenId id) {
        this.tokenId = id;
    }

    public UserID getUserId() {
        return userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SecurityToken that = (SecurityToken) o;

        if (!tokenId.equals(that.tokenId)) return false;
        return userId.equals(that.userId);

    }
    public LocalDateTime getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(LocalDateTime expireTime) {
        this.expireTime = expireTime;
    }

    @Override
    public int hashCode() {
        return tokenId.hashCode();
    }
}
