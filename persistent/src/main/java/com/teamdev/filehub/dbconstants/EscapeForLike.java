package com.teamdev.filehub.dbconstants;

public class EscapeForLike {

    public static String escapeForLike(String param) {
        return param.replace("!", "!!").replace("%", "!%").replace("_", "!_");//  .replace("")
    }
}
