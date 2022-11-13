import {ErrorMessage} from '../../components/error-message.js';

describe('Error message component', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render error message component', async function() {
    expect.assertions(1);

    new ErrorMessage(fixture, 'Test error');

    const errorMessageMarkup =
            `<p class="error-label">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                Test error
            </p>`;

    expect(errorMessageMarkup).toBe(fixture.innerHTML);
  });
});
