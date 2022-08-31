package com.teamdev.logout;

import com.teamdev.util.Command;

/**
 * The implementation of {@link Command} for holding information about user who wants to log out.
 */
public class LogOutCommand implements Command {

    private final String id;


    public LogOutCommand(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
