package dto;


import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserID;

import java.time.LocalDateTime;



/**
 * Data transfer object for security token entity
 */
public class SecurityTokenDTO {

    private final SecurityTokenId tokenId;
    private final UserID userId;
    private final LocalDateTime expiredTime;

    public SecurityTokenDTO(SecurityTokenId tokenId, UserID userId , LocalDateTime expiredTime) {
        this.tokenId = tokenId;
        this.userId = userId;
        this.expiredTime = expiredTime;
    }


    public SecurityTokenId getTokenId() {
        return tokenId;
    }

    public UserID getUserId() {
        return userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SecurityTokenDTO that = (SecurityTokenDTO) o;

        if (!tokenId.equals(that.tokenId)) return false;
        return userId.equals(that.userId);

    }

    @Override
    public int hashCode() {
        return tokenId.hashCode();
    }
}
