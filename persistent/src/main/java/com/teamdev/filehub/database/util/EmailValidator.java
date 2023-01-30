package com.teamdev.filehub.database.util;

import javax.annotation.ParametersAreNonnullByDefault;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * This example demonstrate ho to validate email.
 */
public class EmailValidator {

    private static final String EMAIL_PATTERN =
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
                    "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN);

    private static Matcher matcher;

    /**
     * Checks if the entered email is correctю
     */
    @ParametersAreNonnullByDefault
    public static boolean validate(final String hex) {
        matcher = pattern.matcher(hex);

        return matcher.matches();
    }

}