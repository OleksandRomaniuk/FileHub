import {
  validateEmail,
  validateSize,
  validatePasswordEquality,
} from '../../validation/validation.js';


const {module, test} = QUnit;

module('validateSize', () =>{
  test('Should return unresolved promise when argument is invalid', async function(assert) {
    const values = [
      'fdbv',
      'fd',
      'fd',
      '',
      undefined,
      null,
      145,
      {},
      [5, 'safsc'],
    ];
    assert.expect(2 * values.length);

    const validator = validateSize(5);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      try {
        await validator(value);
      } catch (error) {
        assert.ok(true, `Should throw error for value ${value}`);
        assert.strictEqual(error.message, 'have to be more than 5', 'should return error message');
      }
    }
  });

  test('Should return resolved promise when argument is valid', function(assert) {
    const values = [
      'fdaszxcvfdegbv',
      'gmail',
      'cherginskaya@gmail.com',
    ];
    assert.expect( values.length);

    const validator = validateSize(5);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      validator(value)
          .then(
              assert.ok(true, `Should return promise when value ${value}`),
          );
    }
  });
});

module('validateEmail', () => {
  test('Should return resolved promise when argument is valid', function(assert) {
    const values = [
      'email@fdvv.com',
      'gmail',
      'cherginskaya@gmail.com',
      'email-maria-teamDev@gmail.+com',
      'email-maria-teamDev@gmail.mail.InInternet+com',
    ];
    assert.expect(values.length);
    const validator = validateEmail;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      validator(value)
          .then(() => {
            assert.ok(true, `Should return promise when email is ${value}`);
          });
    }
  });
  test('Should return unresolved promise when argument is invalid', function(assert) {
    const values = [
      'rsfsazcУкраїна',
      'rsfsazc/*-+rf',
      'cherginskaya@gmail.com!',
      'email-maria-teamDev@gmail.+com$',
      'asdcfasz4525!!!',
    ];
    assert.expect(values.length);
    const validator = validateEmail;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      validator(value)
          .catch(() => {
            assert.ok(true, `Should return promise when email is ${value}`);
          });
    }
  });
});

module('validatePasswordEquality', () =>{
  test('Should return resolved promise when argument is valid and passwords are equal', function(assert) {
    const values = [
      ['password', 'password'],
      ['password584985548542esd', 'password584985548542esd'],
      ['cherry#$%', 'cherry#$%'],
    ];
    assert.expect( values.length);

    for (let i = 0; i < values.length; i++) {
      const validator = validatePasswordEquality(values[i][0]);
      const value = values[i][1];
      validator(value)
          .then(() => {
            assert.ok(true, `Should return promise when password is ${value} and password confirm is ${values[i][0]}`);
          });
    }
  });
  test('Should return unresolved promise when argument is invalid  and passwords are not equal', function(assert) {
    const values = [
      ['password', 'passwordcs'],
      ['password584985548542esd', 'password58498df5548542esd'],
      ['cherry#$%', '#$%cherry#$%'],
      ['cherry#$%', ''],
    ];
    assert.expect(2 * values.length);
    for (let i = 0; i < values.length; i++) {
      const validator = validatePasswordEquality(values[i][0]);
      const value = values[i][1];
      validator(value)
          .catch((e) => {
            // eslint-disable-next-line max-len
            assert.ok(true, `Should catch error when when password is ${value} and password confirm is ${values[i][0]}`);
            assert.strictEqual(e.message, 'Passwords aren\'t equals', 'should return error message');
          });
    }
  });
});
