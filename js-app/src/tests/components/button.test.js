import {Button} from '../../components/button';

describe('Button component', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should check button creation and inner text.', async function() {
    expect.assertions(2);

    const button = new Button(fixture, 'Button');

    const buttonMarkup =
        `<button class="button button-primary" type="submit" title="Button" data-td="button">
            Button
        </button>`;

    expect(buttonMarkup).toBe(fixture.innerHTML);
    expect(button.rootElement.title).toBe('Button');
  });
});
