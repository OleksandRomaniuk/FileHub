package com.teamdev.filehub.database.util;

import java.time.ZoneId;
import java.util.TimeZone;

/**
 * The class that provides constant time zone.
 */
public class ConstTimeZone {

    private final static TimeZone timeZone = TimeZone.getTimeZone("Europe/Kiev");

    public static ZoneId getTimeZone() {
        return timeZone.toZoneId();
    }
}
