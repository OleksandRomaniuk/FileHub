package com.teamdev.filehub;

import com.google.common.base.Preconditions;

import javax.annotation.ParametersAreNonnullByDefault;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Hash {

    @ParametersAreNonnullByDefault
    public static String hashPassword(String password) {

        Preconditions.checkNotNull(password);

        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        md.update(password.getBytes());
        byte[] bytes = md.digest();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }

}
