import {
  validateEmail,
  validateSize,
  validatePasswordEquality,
} from '../../validation/validators';


describe('ValidateSize', () =>{
  test('Should return unresolved promise when argument is invalid', async function() {
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
    expect.assertions(values.length);

    const validator = validateSize(5);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      await expect(validator(value)).rejects.toThrow('have to be more than 5');
    }
  });

  test('Should return resolved promise when argument is valid', async ()=> {
    const values = [
      'fdaszxcvfdegbv',
      'gmail',
      'cherginskaya@gmail.com',
    ];
    expect.assertions( values.length);

    const validator = validateSize(5);
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      await expect(validator(value)).resolves.toBe('Everything is valid.');
    }
  });
});

describe('validateEmail', () => {
  test('Should return resolved promise when argument is valid', async () =>{
    const values = [
      'email@fdvv.com',
      'gmail',
      'cherginskaya@gmail.com',
      'email-maria-teamDev@gmail.com',
      'email-maria-teamDev@gmail.mail.InInternetcom',
    ];
    expect.assertions(values.length);
    const validator = validateEmail;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      await expect( validator(value)).resolves.toBeUndefined();
    }
  });
  test('Should return unresolved promise when argument is invalid', async () => {
    const values = [
      'rsfsazcУкраїна',
      'rsfsazc/*-+rf',
      'cherginskaya@gmail.com!',
      '#email-maria-teamDev@gmail.+com$',
      'asdcfasz4525!!!',
    ];
    expect.assertions(values.length);
    const validator = validateEmail;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      await expect(validator(value)).rejects.toThrow(`only Latin, numbers and symbols +.-_@ are allowed in email`);
    }
  });
});

describe('validatePasswordEquality', () =>{
  test('Should return resolved promise when argument is valid and passwords are equal', async () => {
    const values = [
      ['password', 'password'],
      ['password584985548542esd', 'password584985548542esd'],
      ['cherry#$%', 'cherry#$%'],
    ];
    expect.assertions(values.length);

    for (let i = 0; i < values.length; i++) {
      const validator = validatePasswordEquality(values[i][0]);
      const value = values[i][1];
      await expect(validator(value)).resolves.toBeUndefined();
    }
  });
  test('Should return unresolved promise when argument is invalid  and passwords are not equal', async ()=> {
    const values = [
      ['password', 'passwordcs'],
      ['passrd584985548542esd', 'password58498df5548542esd'],
      ['cherry#$%', '#$%cherry#$%'],
      ['cherry#$%', ''],
    ];
    expect.assertions(values.length);
    for (let i = 0; i < values.length; i++) {
      const validator = validatePasswordEquality(values[i][0]);
      const value = values[i][1];
      await expect(validator(value)).rejects.toThrow('Passwords aren\'t equals');
    }
  });
});
