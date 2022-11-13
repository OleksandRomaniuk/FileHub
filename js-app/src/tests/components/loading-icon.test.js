import {LoadingIcon} from '../../components/loading-icon.js';

describe('Icon loading component', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render loading icon.', async function() {
    expect.assertions(1);

    new LoadingIcon(fixture);

    const loadingIconMarkup =
            `<span class="glyphicon glyphicon-loader" aria-hidden="true"></span>`;

    expect(loadingIconMarkup).toBe(fixture.innerHTML);
  });
});
