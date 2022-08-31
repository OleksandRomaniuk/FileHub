package com.teamdev.util;

import org.junit.Assert;
import org.junit.jupiter.api.Test;

import static com.teamdev.util.Hash.hashPassword;

class HashTest {
    @Test
    void validationHashPassword() {

        String hashPassword = hashPassword("password");
        String hashPassword2 = hashPassword("password");
        Assert.assertEquals(hashPassword, hashPassword2);
    }
}