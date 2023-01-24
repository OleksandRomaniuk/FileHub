package com.teamdev.filehub.authenticateduser;

import com.teamdev.filehub.Query;

/**
 * The query that holds the token.
 */
public class TokenDataQuery implements Query {

    private final String token;

    public TokenDataQuery(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
