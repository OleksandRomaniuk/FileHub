import {validateValueEquals, validateValueLength, validateValueWithRegex} from '../../validation/validators.js';

const {module, test} = QUnit;

module('validateValueLength', () => {
  test(`Should return resolved promise is arguments is valid.`, async function(assert) {
    const testValues = [
      [6, 'password'],
      [2, 'pas'],
      [10, 'desultoriness'],
      [0, ''],
    ];

    assert.expect(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueLength(testValue[0]);

      await validator(testValue[1]);
      assert.ok(true, `Should resolve promise with minimal length of input: ${testValue[0]}
      and input value: ${testValue[1]}`);
    }
  });

  test(`Should return an error by length if length is not valid `, async function(assert) {
    const testValues = [
      [6, 'passw'],
      [2, 'p'],
      [10, 'result'],
    ];

    assert.expect(2 * testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueLength(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        assert.ok(true, `Should throw error minimal length of input: ${testValue[0]} and input value: ${testValue[1]}`);
        assert.strictEqual(error.message,
            `Text must be more than ${testValue[0]} symbols`,
            'Should return expected message.');
      }
    }
  });

  test('Should return an error if arguments is mistype', async function(assert) {
    const testValues = [
      [6, null],
      [2, undefined],
      [2, NaN],
      [10, {}],
      [10, []],
    ];

    assert.expect(2 * testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueLength(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        assert.ok(true, `Should throw error minimal length of input: ${testValue[0]} and input value: ${testValue[1]}`);
        assert.strictEqual(error.message,
            `Expected string but ${typeof testValue[1]} provided.`,
            'Should return expected message.');
      }
    }
  });
});

module('validateValueEquals', () => {
  test(`Should return resolved promise if arguments is valid.`, async function(assert) {
    const testValues = [
      ['password', 'password'],
      ['', ''],
      [' ', ' '],
    ];

    assert.expect(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueEquals(testValue[0]);

      await validator(testValue[1]);
      assert.ok(true, `Should resolve promise with arguments: reference value - ${testValue[0]}
      and actual value - ${testValue[1]}`);
    }
  });

  test(`Should return error if arguments is invalid.`, async function(assert) {
    const testValues = [
      ['passwor', 'password'],
      ['', 'p'],
      ['desultorine', 'desultoriness'],
    ];

    assert.expect(2 * testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueEquals(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        assert.ok(true, `Should throw error with arguments: reference value - ${testValue[0]}
      and actual value - ${testValue[1]}`);
        assert.strictEqual(error.message,
            `${testValue[0]} is not equal to ${testValue[1]}`,
            'Should return expected message.');
      }
    }
  });


});

module('validateValueWithRegex', () => {
  test(`Should return resolved promise if arguments is valid.`, async function(assert) {
    const testValues = [
      [/^[a-z\d+.\-_@]+$/, 'password'],
      [/^[a-z\d+.\-_@]+$/, 'p-a'],
      [/^[a-z\d+.\-_@]+$/, '123'],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, 'art@sn'],
    ];

    assert.expect(testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueWithRegex(testValue[0]);

      await validator(testValue[1]);
      assert.ok(true, `Should resolve promise with arguments: regex - ${testValue[0]}
      and value - '${testValue[1]}'`);
    }
  });

  test(`Should return resolved promise is arguments is invalid.`, async function(assert) {
    const testValues = [
      [/^[a-z\d+.\-_@]+$/, 'passw%%ord'],
      [/^[a-z\d+.\-_@]+$/, 'p#a'],
      [/^[a-z\d+.\-_@]+$/, '1!23'],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, 'art@'],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, 'a%#'],
    ];

    assert.expect(2 * testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueWithRegex(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        assert.ok(true, `Should throw error with arguments: regex - ${testValue[0]}
      and value - ${testValue[1]}`);
        assert.strictEqual(error.message,
            `Field is not valid`,
            'Should return expected message.');
      }
    }
  });

  test(`Should return error if arguments is mistype.`, async function(assert) {
    const testValues = [
      [/^[a-z\d+.\-_@]+$/, null],
      [/^[a-z\d+.\-_@]+$/, undefined],
      [/^[a-z\d+.\-_@]+$/, NaN],
      [/^[a-z\d+.\-_@]+$/, {}],
      [/^[a-zA-Z0-9+\\._\-]{3,}@{1}[a-z]{2,}(\\.?[a-z]{1,10})?$/, []],
    ];

    assert.expect(2 * testValues.length);

    for (const testValue of testValues) {
      const validator = validateValueWithRegex(testValue[0]);

      try {
        await validator(testValue[1]);
      } catch (error) {
        assert.ok(true, `Should throw error with arguments: regex - ${testValue[0]} and value - ${testValue[1]}`);
        assert.strictEqual(error.message,
            `Expected string but ${typeof testValue[1]} provided.`,
            'Should return expected message.');
      }
    }
  });
});
