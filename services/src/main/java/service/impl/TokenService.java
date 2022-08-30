package service.impl;


import dto.SecurityTokenDTO;
import entities.SecurityToken;
import entities.User;
import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reposirory.impl.SecurityTokenRepository;
import reposirory.impl.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.TimeZone;

/**
 * Service for realization main concept for work with security token
 */
public class TokenService {

    private final TimeZone timeZone = TimeZone.getTimeZone("Europe/Kiev");

    private final Logger log = LoggerFactory.getLogger(TokenService.class);

    private final SecurityTokenRepository tokenRepository = new SecurityTokenRepository();
    private final UserRepository userRepository = new UserRepository();

    public Collection<SecurityTokenDTO> findAllActiveTokenDTO() {

        if (log.isInfoEnabled()) {
            log.info("Start looking for all security tokens...");
        }

        final Collection<SecurityToken> tokens = tokenRepository.findAll();

        final Collection<SecurityTokenDTO> securityTokenDTOList = new ArrayList<>();

        for (SecurityToken token : tokens) {
            if(token.getExpireTime().isBefore(LocalDateTime.now(timeZone.toZoneId())))
                securityTokenDTOList.add(createDTOFromToken(token));
        }


        return securityTokenDTOList;

    }
    public User findUserByToken(SecurityTokenId securityTokenId){
        final SecurityToken token = tokenRepository.findById(securityTokenId);
        final User user = userRepository.findById(token.getUserId());
        return user;
    }

    SecurityToken findTokenByUser(UserID userId){

        if (log.isInfoEnabled()) {
            log.info("Start looking for token  by user id...");
        }
        // Cleaning DB
        findAllActiveTokenDTO();

        final SecurityToken token = tokenRepository.findByUserId(userId);

        return token;

    }

    private static SecurityTokenDTO createDTOFromToken(SecurityToken securityToken) {
        return new SecurityTokenDTO(securityToken.getId(), securityToken.getUserId(),securityToken.getExpireTime());
    }

}

