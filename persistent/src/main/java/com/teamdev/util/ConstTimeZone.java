package com.teamdev.util;

import java.time.ZoneId;
import java.util.TimeZone;

public class ConstTimeZone {

    private final static TimeZone timeZone = TimeZone.getTimeZone("Europe/Kiev");


    public static ZoneId getTimeZone() {
        return timeZone.toZoneId();
    }
}
