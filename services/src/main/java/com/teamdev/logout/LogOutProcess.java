package com.teamdev.logout;
import com.teamdev.util.Process;
import com.teamdev.util.ProcessException;

/**
 * The interface allows handle {@link LogOutCommand} and return {@link String}.
 */
public interface LogOutProcess extends Process<LogOutCommand, String> {
    @Override
    String handle(LogOutCommand command) throws ProcessException;
}
