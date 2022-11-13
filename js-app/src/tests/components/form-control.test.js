import {FormControl} from '../../components/form-control.js';


describe('Form control component', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });
  test('Should render form control component', function() {
    expect.assertions(6);

    const formControl = new FormControl(fixture, {
      label: 'Test-label',
      type: 'password',
      placeholder: 'test',
      name: 'test-name',
    });
    formControl.value = 'Password';
    const errors = ['Field is not valid', 'Field is not match regex'];
    formControl.errorMessages = errors;

    const actualFormControl = fixture.querySelector('[data-td="form-control"]');
    const label = fixture.querySelector('[data-td="label"]');
    const input = fixture.querySelector('[data-td="input"]');
    const errorMessages = fixture.querySelectorAll('[data-td="error-messages"]');

    const renderedErrors = [...errorMessages]
        .map((error) => error.textContent.trim());

    expect(actualFormControl).toBeTruthy();
    expect(label.textContent.trim()).toBe('Test-label');

    expect(input.type).toBe('password');
    expect(input.placeholder).toBe('test');
    expect(input.name).toBe('test-name');

    expect(errors).toEqual(renderedErrors);
  });
});
