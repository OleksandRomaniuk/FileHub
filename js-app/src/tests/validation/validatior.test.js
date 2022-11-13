import {validateValueEquals, validateValueLength, validateValueWithRegex} from '../../validation/validators.js';


describe('validateValueLength', () => {
  test(`Should return resolved promise is arguments is valid.`, async function() {
    const testValues = [
      [6, 'password'],
      [2, 'pas'],
      [10, 'desultoriness'],
      [0, ''],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueLength(testValue[0]);

      await validator(testValue[1]);
      expect(true).toBeTruthy();
    }
  });

  test(`Should return an error by length if length is not valid `, async function() {
    const testValues = [
      [6, 'passw'],
      [2, 'p'],
      [10, 'result'],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueLength(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        expect(error.message).toBe(`Text must be more than ${testValue[0]} symbols`);
      }
    }
  });

  test('Should return an error if arguments is mistype', async function() {
    const testValues = [
      [6, null],
      [2, undefined],
      [2, NaN],
      [10, {}],
      [10, []],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueLength(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        expect(error.message).toBe(`Expected string but ${typeof testValue[1]} provided.`);
      }
    }
  });
});

describe('validateValueEquals', () => {
  test(`Should return resolved promise if arguments is valid.`, async function() {
    const testValues = [
      ['password', 'password'],
      ['', ''],
      [' ', ' '],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueEquals(testValue[0]);

      await validator(testValue[1]);
      expect(true).toBeTruthy();
    }
  });

  test(`Should return error if arguments is invalid.`, async function() {
    const testValues = [
      ['passwor', 'password'],
      ['', 'p'],
      ['desultorine', 'desultoriness'],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueEquals(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        expect(error.message).toBe(`${testValue[0]} is not equal to ${testValue[1]}`);
      }
    }
  });

  test(`Should return resolved promise is arguments is mistype.`, async function() {
    const testValues = [
      ['passwor', null],
      ['', undefined],
      ['', NaN],
      ['desultorine', {}],
      ['desultorine', []],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueEquals(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        expect(error.message).toBe(`Expected string but ${typeof testValue[1]} provided.`);
      }
    }
  });
});

describe('validateValueWithRegex', () => {
  test(`Should return resolved promise if arguments is valid.`, async function() {
    const testValues = [
      [/^[a-z\d+.\-_@]+$/, 'password'],
      [/^[a-z\d+.\-_@]+$/, 'p-a'],
      [/^[a-z\d+.\-_@]+$/, '123'],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, 'art@sn'],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueWithRegex(testValue[0]);

      await validator(testValue[1]);
      expect(true).toBeTruthy();
    }
  });

  test(`Should return resolved promise is arguments is invalid.`, async function() {
    const testValues = [
      [/^[a-z\d+.\-_@]+$/, 'passw%%ord'],
      [/^[a-z\d+.\-_@]+$/, 'p#a'],
      [/^[a-z\d+.\-_@]+$/, '1!23'],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, 'art@'],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, 'a%#'],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueWithRegex(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        expect(error.message).toBe(`Field is not valid`);
      }
    }
  });

  test(`Should return error if arguments is mistype.`, async function() {
    const testValues = [
      [/^[a-z\d+.\-_@]+$/, null],
      [/^[a-z\d+.\-_@]+$/, undefined],
      [/^[a-z\d+.\-_@]+$/, NaN],
      [/^[a-z\d+.\-_@]+$/, {}],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, []],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueWithRegex(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        expect(error.message).toBe(`Expected string but ${typeof testValue[1]} provided.`);
      }
    }
  });
});
