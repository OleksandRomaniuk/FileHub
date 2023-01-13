import {AuthorizationForm} from '../../authorization/authorization-form';
import {jest} from '@jest/globals';

describe('AuthorizationForm', () =>{
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should return values of elements in form', () =>{
    expect.assertions(6);
    new AuthorizationForm(fixture);
    const form = fixture.querySelector('form');
    expect(form).toBeDefined();
    const inputs = form.querySelectorAll('input');
    expect(inputs.length).toBe(2);
    expect(inputs[0].name).toBe('email');
    expect(inputs[1].name).toBe('password');
    const buttonText = form.querySelector('button').textContent;
    expect(buttonText).toMatch('Sign in');
    const textLink = form.querySelector('a').textContent;
    expect(textLink).toMatch('Don\'t have an account yet?');
  });
  test('Should submit validated form', () =>{
    return new Promise((done) => {
      expect.assertions(1);
      const componentForm = new AuthorizationForm(fixture);
      const mockFn = jest.fn();
      componentForm.onSubmitted(mockFn);
      const form = fixture.querySelector('form');
      const inputs = form.querySelectorAll('input');
      inputs[0].value ='email@dgvzds.hg';
      inputs[1].value ='password';
      form.querySelector('button[data-td="button"]').click();
      setTimeout(()=>{
        expect(mockFn).toHaveBeenCalled();
        done();
      });
    });
  });
  test('Should set value for inputs', async function() {
    expect.assertions(2);
    new AuthorizationForm(fixture);
    const form = fixture.querySelector('form');
    const inputs = form.querySelectorAll('input');
    inputs[0].value ='email@dgvzds.hg';
    inputs[1].value ='password';
    const inputsFromDocument = fixture.querySelectorAll('input');
    expect(inputsFromDocument[0].value).toBe('email@dgvzds.hg');
    expect(inputsFromDocument[1].value).toBe('password');
  });
  [
    ['e!a', 'pasw', 'only Latin, numbers and symbols +.-_@ are allowed in email', 'have to be more than 5',
      'have to be more than 6'],
    ['@#ai', 'p', 'only Latin, numbers and symbols +.-_@ are allowed in email', 'have to be more than 5',
      'have to be more than 6'],
    ['@#ai', 'p', 'only Latin, numbers and symbols +.-_@ are allowed in email', 'have to be more than 5',
      'have to be more than 6'],
  ].forEach(([email, password, textErrorEmail, secondTextErrorEmail,
    textErrorPassword])=>{
    test('validateForm', () =>{
      return new Promise((done) => {
        expect.assertions(4);

        new AuthorizationForm(fixture);
        const form = fixture.querySelector('form');
        const inputs = form.querySelectorAll('input');
        inputs[0].value = email;
        inputs[1].value = password;
        form.querySelector('button[data-td="button"]').click();

        setTimeout(() => {
          let i = 0;
          const formControls = fixture.querySelectorAll('[data-td="form-control"] p');
          expect(formControls.length).toBe(3);
          expect(formControls[i++].textContent).toBe(textErrorEmail);
          expect(formControls[i++].textContent).toBe(secondTextErrorEmail);
          expect(formControls[i++].textContent).toBe(textErrorPassword);
          done();
        });
      });
    });
  });
});
