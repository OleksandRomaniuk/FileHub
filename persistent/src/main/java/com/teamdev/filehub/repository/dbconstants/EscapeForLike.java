package com.teamdev.filehub.repository.dbconstants;

public class EscapeForLike {

    public static String escapeForLike(String param) {
        return param.replace("!", "!!").replace("%", "!%").replace("_", "!_");//  .replace("")
    }
}
