package com.teamdev.filehub.database.repository.sql;

public class EscapeForLike {

    public static String escapeForLike(String param) {
        return param.replace("!", "!!").replace("%", "!%").replace("_", "!_");//  .replace("")
    }
}
