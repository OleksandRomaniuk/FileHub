import {Form} from '../../components/form.js';
import {FormControl} from '../../components/form-control.js';
import {Link} from '../../components/link.js';
import {jest} from '@jest/globals';

describe('Form component', () => {
  let fixture;
  let form;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    form = new Form(fixture, 'ButtonText');
    form.addInput((slot) => {
      new FormControl(slot, {
        label: 'Test',
        name: 'Test',
        placeholder: 'Test',
      });
    });
    form.addFooter((slot) => {
      new Link(slot, 'LinkText');
    });
  });
  test('Should render form component', function() {
    expect.assertions(5);
    const actualFormMarkup = fixture.querySelector('[data-td="form"]');
    actualFormMarkup.requestSubmit();

    const button = fixture.querySelector('[data-td="button"]');
    const link = fixture.querySelector('[data-td="link"]');
    const actualFormControl = fixture.querySelector('[data-td="form-control"]');

    expect(actualFormMarkup).toBeTruthy();
    expect(button.textContent.trim()).toBe('ButtonText');
    expect(button.firstElementChild.title).toBe('ButtonText');
    expect(link.textContent.trim()).toBe('LinkText');
    expect(actualFormControl).toBeTruthy();
  });

  test('Should add listener to submit event', () => {
    return new Promise((done) => {
      expect.assertions(1);

      const mockFn = jest.fn();

      form.onSubmit(mockFn);
      const actualFormMarkup = fixture.querySelector('[data-td="form"]');
      actualFormMarkup.requestSubmit();

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
