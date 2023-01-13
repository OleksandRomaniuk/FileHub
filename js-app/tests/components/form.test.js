import {Form} from '../../components/form';
import {FormControl} from '../../components/form-control';
import {Link} from '../../components/link';
import {jest} from '@jest/globals';


describe('Form', () =>{
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should return values of form', async function() {
    expect.assertions(3);
    new Form(fixture, 'Sign up', (slot)=>{
      const link = new Link(slot, 'Don\'t have an account yet?');
      link.onClick(()=>{
        expect(true).toBeTruthy();
      });
    });
    const form = fixture.querySelector('form[data-td="form"]');
    expect(form).toBeDefined();

    const buttonText = form.querySelector('button').textContent;
    expect(buttonText).toMatch('Sign up');

    const link = form.querySelector('a[data-td="link"]');
    link.click();
  });

  test('Should return added inputs', async function() {
    expect.assertions(7);
    const form = new Form(fixture, 'Sign up', ()=>{});

    let formFromDocument = fixture.querySelector('form[data-td="form"]');
    expect(formFromDocument).toBeDefined();
    let formInputs = formFromDocument.querySelectorAll('input');
    let formLabels = formFromDocument.querySelectorAll('label');
    expect(formInputs.length).toBe(0);
    expect(formLabels.length).toBe(0);
    form.addInput((slot) => {
      new FormControl(slot,
        {
          labelText: 'Email',
          placeholder: 'Email',
          name: 'email',
        });
    });
    formFromDocument = fixture.querySelector('form[data-td="form"]');
    formInputs = formFromDocument.querySelectorAll('input');
    formLabels = formFromDocument.querySelectorAll('label');

    expect(formInputs.length).toBe(1);
    expect(formLabels.length).toBe(1);

    const placeholder = formInputs[0].placeholder;
    const labelText = formLabels[0].textContent;
    expect(placeholder).toBe('Email');
    expect(labelText).toBe('Email');
  });
  test('Should check action during click', async function() {
    expect.assertions(1);
    const form = new Form(fixture, 'Sign up', ()=>{});
    const mockFn = jest.fn();
    form.onSubmit(mockFn);
    const formFromDocument = fixture.querySelector('button[data-td="button"]');
    formFromDocument.click();
    expect(mockFn).toHaveBeenCalled();
  });
  test('Should create form with inputCrator', async function() {
    expect.assertions(2);
    const form = new Form(fixture, 'Sign up');
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    form.addInput(mockFn1);
    form.addInput(mockFn2);
    expect(mockFn1).toHaveBeenCalled();
    expect(mockFn2).toHaveBeenCalled();
  });
});
