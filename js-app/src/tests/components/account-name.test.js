import {AccountName} from '../../components/account-name.js';

describe('Account name component', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render account name component.', async function() {
    expect.assertions(1);

    new AccountName(fixture, 'testUser');

    const accountNameMarkup =
        `<span class="glyphicon glyphicon-user acc-container" aria-hidden="true">
                    <label class="user-icon">testUser</label>
                </span>`;

    expect(accountNameMarkup).toBe(fixture.innerHTML);
  });
});
