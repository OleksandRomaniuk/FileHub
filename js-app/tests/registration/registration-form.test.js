import {RegistrationForm} from '../../registration/registration-form';
import {jest} from '@jest/globals';


describe('RegistrationForm', () =>{
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should return values of elements in form', ()=> {
    expect.assertions(7);
    new RegistrationForm(fixture);
    const form = fixture.querySelector('form');
    expect(form).toBeDefined();

    const inputs = form.querySelectorAll('input');
    expect(inputs.length).toBe(3);
    expect(inputs[0].name).toBe('email');
    expect(inputs[1].name).toBe('password');
    expect(inputs[2].name).toBe('confirm-password');
    const buttonText = form.querySelector('button').textContent;
    expect(buttonText).toMatch('Sign up');
    const textLink = form.querySelector('a').textContent;
    expect(textLink).toMatch('Already have an account?');
  });
  test('Should set value for inputs', ()=> {
    expect.assertions(3);
    new RegistrationForm(fixture);
    const form = fixture.querySelector('form');
    const inputs = form.querySelectorAll('input');
    inputs[0].value ='email@dgvzds.hg';
    inputs[1].value ='password';
    inputs[2].value ='cobfbpassword';
    const inputsFromDocument = fixture.querySelectorAll('input');
    expect(inputsFromDocument[0].value).toBe('email@dgvzds.hg');
    expect(inputsFromDocument[1].value).toBe('password');
    expect(inputsFromDocument[2].value).toBe('cobfbpassword');
  });

  [
    ['e!ai', 'pasw', 'pas', 'only Latin, numbers and symbols +.-_@ are allowed in email', 'have to be more than 5',
      'have to be more than 6', 'Passwords aren\'t equals'],
    ['e@#i', 'p', 'er', 'only Latin, numbers and symbols +.-_@ are allowed in email', 'have to be more than 5',
      'have to be more than 6',
      'Passwords aren\'t equals'],
    ['#ai', 'pt', 'passwod', 'only Latin, numbers and symbols +.-_@ are allowed in email', 'have to be more than 5',
      'have to be more than 6', 'Passwords aren\'t equals'],
  ].forEach(([email, password, confirmPassword, textErrorEmail, secondTextErrorEmail,
    textErrorPassword, textErrorConfirmPassword])=>{
    test('validateForm', () =>{
      return new Promise((done) => {
        expect.assertions(4);
        new RegistrationForm(fixture);

        const form = fixture.querySelector('form');
        const inputs = form.querySelectorAll('input');
        inputs[0].value = email;
        inputs[1].value = password;
        inputs[2].value = confirmPassword;
        const button = form.querySelector('[data-td="button"] button');
        button.click();
        setTimeout(() => {
          let i = 0;
          const errorMessages = fixture.querySelectorAll('[data-td="form-control"] p');
          expect(errorMessages[i++].textContent).toBe(textErrorEmail);
          expect(errorMessages[i++].textContent).toBe(secondTextErrorEmail);
          expect(errorMessages[i++].textContent).toBe(textErrorPassword);
          expect(errorMessages[i++].textContent).toBe(textErrorConfirmPassword);
          done();
        } );
      });
    });
  });
  test('Should submit validated registration form', () =>{
    return new Promise((done) => {
      return new Promise(() => {
        expect.assertions(1);
        const mockFn = jest.fn();
        const componentForm = new RegistrationForm(fixture);
        componentForm.onSubmitted(mockFn);
        const form = fixture.querySelector('form');
        const inputs = form.querySelectorAll('input');
        inputs[0].value ='email@dgvzds.hg';
        inputs[1].value ='password';
        inputs[2].value ='password';
        form.querySelector('button[data-td="button"]').click();
        setTimeout(()=>{
          expect(mockFn).toHaveBeenCalled();
          done();
        });
      });
    });
  });
});
