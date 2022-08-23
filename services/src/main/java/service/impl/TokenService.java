package service.impl;


import com.google.common.base.Preconditions;
import dto.LoginDTO;
import dto.SecurityTokenDTO;
import dto.UserDTO;
import entities.SecurityToken;
import entities.User;
import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reposirory.impl.SecurityTokenRepository;
import reposirory.impl.UserRepository;
import service.UserAuthenticationException;
import service.UserService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.TimeZone;

/**
 * Implementation of {@link UserService} interface
 */
public class TokenService {

    private final TimeZone timeZone = TimeZone.getTimeZone("Europe/Kiev");

    private final Logger log = LoggerFactory.getLogger(TokenService.class);

    private final UserRepository userRepository = new UserRepository();
    private final SecurityTokenRepository tokenRepository = new SecurityTokenRepository();

    public Collection<SecurityTokenDTO> findAllActiveTokenDTO() {

        if (log.isInfoEnabled()) {
            log.info("Start looking for all security tokens...");
        }

        final Collection<SecurityToken> tokens = tokenRepository.findAll();

        final Collection<SecurityTokenDTO> securityTokenDTOList = new ArrayList<>();

        for (SecurityToken token : tokens) {
            if(token.getExpireTime().isBefore(LocalDateTime.now()))
                securityTokenDTOList.add(createDTOFromToken(token));
        }

        return securityTokenDTOList;

    }
    SecurityToken findTokenByUser(UserId userId){

        if (log.isInfoEnabled()) {
            log.info("Start looking for token  by user id...");
        }
        // Cleaning DB
        Collection<SecurityTokenDTO> tokensDTO = findAllActiveTokenDTO();

        final SecurityToken token = tokenRepository.findByUserId(userId);

            return token;

    }

    private static SecurityTokenDTO createDTOFromToken(SecurityToken securityToken) {
        return new SecurityTokenDTO(securityToken.getId(), securityToken.getUserId(),securityToken.getExpireTime());
    }

}

