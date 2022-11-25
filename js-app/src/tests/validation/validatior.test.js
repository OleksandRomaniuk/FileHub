import {validateValueEquals, validateValueLength, validateValueWithRegex} from '../../validation/validators.js';


describe('validateValueLength', () => {
  test(`Should return resolved promise is arguments is valid.`, async function() {
    const validArguments = [
      [6, 'password'],
      [2, 'pas'],
      [10, 'desultoriness'],
      [0, ''],
    ];

    expect.assertions(validArguments.length);

    for (const testValue of validArguments) {
      const validator = validateValueLength(testValue[0]);

      await expect(validator(testValue[1])).resolves.toBeUndefined();
    }
  });

  test(`Should return an error by length if length is not valid`, async function() {
    const invalidArguments = [
      [6, 'passw'],
      [2, 'p'],
      [10, 'result'],
    ];

    expect.assertions(invalidArguments.length);

    for (const testValue of invalidArguments) {
      const validator = validateValueLength(testValue[0]);

      await expect(validator(testValue[1])).rejects.toThrow(`Text must be more than ${testValue[0]} symbols`);
    }
  });

  test('Should return an error if arguments is mistype', async function() {
    const invalidArguments = [
      [6, null],
      [2, undefined],
      [2, NaN],
      [10, {}],
      [10, []],
    ];

    expect.assertions(invalidArguments.length);

    for (const testValue of invalidArguments) {
      const validator = validateValueLength(testValue[0]);

      await expect(validator(testValue[1])).rejects.toThrow(`Expected string but ${typeof testValue[1]} provided.`);
    }
  });
});

describe('validateValueEquals', () => {
  test(`Should return resolved promise if arguments is valid.`, async function() {
    const validArguments = [
      ['password', 'password'],
      ['', ''],
      [' ', ' '],
    ];

    expect.assertions(validArguments.length);

    for (const testValue of validArguments) {
      const validator = validateValueEquals(testValue[0]);

      await expect(validator(testValue[1])).resolves.toBeUndefined();
    }
  });

  test(`Should return error if arguments is invalid.`, async function() {
    const invalidArguments = [
      ['passwor', 'password'],
      ['', 'p'],
      ['desultorine', 'desultoriness'],
    ];

    expect.assertions(invalidArguments.length);

    for (const testValue of invalidArguments) {
      const validator = validateValueEquals(testValue[0]);

      await expect(validator(testValue[1])).rejects.toThrow(`Passwords are not equal`);
    }
  });

  test(`Should return resolved promise is arguments is mistype.`, async function() {
    const invalidArguments = [
      ['passwor', null],
      ['', undefined],
      ['', NaN],
      ['desultorine', {}],
      ['desultorine', []],
    ];

    expect.assertions(invalidArguments.length);

    for (const testValue of invalidArguments) {
      const validator = validateValueEquals(testValue[0]);

      await expect(validator(testValue[1])).rejects.toThrow(`Expected string but ${typeof testValue[1]} provided.`);
    }
  });
});

describe('validateValueWithRegex', () => {
  test(`Should return resolved promise if arguments is valid.`, async function() {
    const validArguments = [
      [/^[a-z\d+.\-_@]+$/, 'password'],
      [/^[a-z\d+.\-_@]+$/, 'p-a'],
      [/^[a-z\d+.\-_@]+$/, '123'],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, 'art@sn'],
    ];

    expect.assertions(validArguments.length);

    for (const testValue of validArguments) {
      const validator = validateValueWithRegex(testValue[0]);

      await expect(validator(testValue[1])).resolves.toBeUndefined();
    }
  });

  test(`Should return resolved promise is arguments is invalid.`, async function() {
    const invalidArguments = [
      [/^[a-z\d+.\-_@]+$/, 'passw%%ord'],
      [/^[a-z\d+.\-_@]+$/, 'p#a'],
      [/^[a-z\d+.\-_@]+$/, '1!23'],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, 'art@'],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, 'a%#'],
    ];

    expect.assertions(invalidArguments.length);

    for (const testValue of invalidArguments) {
      const validator = validateValueWithRegex(testValue[0]);

      await expect(validator(testValue[1])).rejects.toThrow(`You can use only latin letters, numbers, and _,@,.,+.-`);
    }
  });

  test(`Should return error if arguments is mistype.`, async function() {
    const validArguments = [
      [/^[a-z\d+.\-_@]+$/, null],
      [/^[a-z\d+.\-_@]+$/, undefined],
      [/^[a-z\d+.\-_@]+$/, NaN],
      [/^[a-z\d+.\-_@]+$/, {}],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, []],
    ];

    expect.assertions(validArguments.length);

    for (const testValue of validArguments) {
      const validator = validateValueWithRegex(testValue[0]);

      await expect(validator(testValue[1])).rejects.toThrow(`Expected string but ${typeof testValue[1]} provided.`);
    }
  });
});
