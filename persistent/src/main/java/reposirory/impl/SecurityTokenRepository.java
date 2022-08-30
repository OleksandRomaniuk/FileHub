package reposirory.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entities.SecurityToken;
import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserID;
import reposirory.InMemoryRepository;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * {@link InMemoryRepository} implementation for authenticated users
 */
public class SecurityTokenRepository
        extends InMemoryRepository<SecurityTokenId, SecurityToken> {

    private final AtomicLong idCounter = new AtomicLong(1);


    public SecurityToken findByUserId(UserID userId) {
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

    @Override
    public void writeInFile(List<SecurityToken> type) {
        try {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String jsonOutput = gson.toJson(type);
            FileWriter file = new FileWriter("../resources/user.json");
            file.write(jsonOutput);
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateFile(List<SecurityToken> type){

    }
}
