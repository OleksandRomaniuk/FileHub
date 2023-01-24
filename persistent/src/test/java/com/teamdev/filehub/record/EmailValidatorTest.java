package com.teamdev.filehub.record;

import org.junit.Assert;
import org.junit.jupiter.api.Test;

class EmailValidatorTest {


    @Test
    void evaluationForValidation() {

        Assert.assertTrue(EmailValidator.validate("alex@gmail.com"));
        Assert.assertTrue(EmailValidator.validate("alex@gmail.ua"));

        Assert.assertFalse(EmailValidator.validate("alex.ua"));
        Assert.assertFalse(EmailValidator.validate("alex@gmailua"));
        Assert.assertFalse(EmailValidator.validate("alex"));

    }

}