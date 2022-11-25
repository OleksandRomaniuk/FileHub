import {UserProfile} from '../../user-profile/user-profile.js';

describe('User profile', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render error', () => {
    new UserProfile(fixture, {userError: 'Test error message'});

    const errorMarkup = `<slot data-td="user-profile"><p class="error-label">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                Test error message
            </p></slot>`;
    expect(fixture.innerHTML).toBe(errorMarkup);
  });

  test('Should render loading icon', () => {
    new UserProfile(fixture, {isUserLoading: true});

    const loadingIconMarkup =
        `<slot data-td="user-profile"><span class="glyphicon glyphicon-loader" aria-hidden="true"></span></slot>`;

    expect(fixture.innerHTML).toBe(loadingIconMarkup);
  });

  test('Should render username', () => {
    new UserProfile(fixture, {username: 'Test name'});

    const usernameMarkup =
        `<slot data-td="user-profile"><span class="glyphicon glyphicon-user acc-container" aria-hidden="true">
                    <label class="user-icon">Test name</label>
                </span></slot>`;

    expect(fixture.innerHTML).toBe(usernameMarkup);
  });
});
