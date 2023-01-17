import {FormControl} from '../../components/form-control';


describe('FormControl', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should return values of button', () => {
    expect.assertions(4);
    new FormControl(fixture,
      {
        labelText: 'Email',
        placeholder: 'Email',
        name: 'email',
      });
    const formControls = document.querySelectorAll('div[data-td="form-control"]');
    expect(formControls.length).toBe(1);
    const label = formControls[0].querySelector('label').textContent;
    const placeholder = formControls[0].querySelector('input').placeholder;
    const nameInput = formControls[0].querySelector('input').name;
    expect(label).toBe('Email');
    expect(placeholder).toBe('Email');
    expect(nameInput).toBe('email');
  });
  test('Should get name of input', () => {
    expect.assertions(1);
    const formControl = new FormControl(fixture,
      {
        labelText: 'Email',
        placeholder: 'Email',
        name: 'email',
      });
    const formControlFromDocument = document.querySelector('div[data-td="form-control"]');
    expect(formControl.name).toBe(formControlFromDocument.querySelector('input').name);
  });
  test('Should check errors', () => {
    expect.assertions(3);
    const formControl = new FormControl(fixture,
      {
        labelText: 'Email',
        name: 'email',
        errorMessages: ['ERROR'],
      });
    let formControlFromDocument = document.querySelector('div[data-td="form-control"]');
    let error = formControlFromDocument.querySelector('p');
    expect(formControlFromDocument).toBeDefined();
    expect(error.textContent).toBe('ERROR');

    formControl.deleteErrorsMessages();
    formControlFromDocument = fixture.querySelector('div[data-td="form-control"]');
    error = formControlFromDocument.querySelector('p');
    expect(error).toBeNull();
  });
});
