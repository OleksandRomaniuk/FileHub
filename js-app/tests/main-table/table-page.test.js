import {TablePage} from '../../main-table/table-page';
import {ApplicationContext} from '../../application/application-context';
import {expect, jest} from '@jest/globals';

describe('TablePage', () => {
  let fixture;
  let applicationContext;
  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
    applicationContext = new ApplicationContext();
    jest
        .spyOn(applicationContext.apiService, 'getUser')
        .mockImplementation(async () => {
          return {
            userProfile: {
              username: 'Cherhynska',
              rootFolderId: '25',
            },
          };
        });
  });


  test('Should change innerText.', ()=> {
    return new Promise((done) => {
      expect.assertions(2);

      new TablePage(fixture, applicationContext);
      const listOfUserInformation = fixture.querySelector('[data-td="user-information"]');
      setTimeout(()=>{
        expect(listOfUserInformation.innerHTML)
            // eslint-disable-next-line max-len
            .toBe(`<slot><slot data-td="user-info"><slot><span class="glyphicon glyphicon-user user" aria-hidden="true"></span>
                    <span class="glyphicon-class user">
                        Cherhynska
                    </span></slot></slot></slot>`);
        const linkLogOut = fixture.querySelector('[data-td="link-log-out"] a');
        expect(linkLogOut.textContent).toMatch('Log Out');
        done();
      });
    });
  });
});
