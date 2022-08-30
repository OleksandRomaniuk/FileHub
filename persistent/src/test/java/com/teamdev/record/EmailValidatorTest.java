package com.teamdev.record;

import org.junit.Assert;
import org.junit.jupiter.api.Test;

class EmailValidatorTest {


    @Test
    void evaluationForValidation() {
        EmailValidator emailValidator = new EmailValidator();
        Assert.assertTrue(emailValidator.validate("test@gmail.com"));
        Assert.assertTrue(emailValidator.validate("test@gmail.ua"));

        Assert.assertFalse(emailValidator.validate("test.ua"));
        Assert.assertFalse(emailValidator.validate("test@gmailua"));
        Assert.assertFalse(emailValidator.validate("test"));

    }

}