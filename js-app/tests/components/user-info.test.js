import {UserInfo} from '../../components/user-info';

describe('UserInfo', () => {
  let fixture;
  const eventTarget = new EventTarget();

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should change innerText.', ()=> {
    expect.assertions(3);
    const userInfo = new UserInfo(fixture);

    userInfo.userProfile = {username: 'mariia'};
    userInfo.isLoading = false;

    expect(userInfo.markup()).toBe(`<slot><span class="glyphicon glyphicon-user user" aria-hidden="true"></span>
                    <span class="glyphicon-class user">
                        mariia
                    </span></slot>`);

    userInfo.isLoading = true;
    eventTarget.dispatchEvent(new Event(`stateChanged.isUserProfileLoading`));

    expect(userInfo.markup())
      .toBe(`<slot><span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span></slot>`);

    userInfo.isError = true;
    userInfo.isLoading = false;
    eventTarget.dispatchEvent(new Event(`stateChanged.isUserProfileError`));

    expect(userInfo.markup())
      .toBe(`<slot><span class="error-text">
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                   Can't load user data
                </span></slot>`);
  });
});
