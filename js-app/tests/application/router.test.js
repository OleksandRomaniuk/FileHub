import {Router} from '../../application/router';
import {jest} from '@jest/globals';


describe('Router', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should check changing fixture by router.', () => {
    return new Promise((done) => {
      expect.assertions(5);
      const listener = jest.fn(()=>{});
      Router.getBuilder()
        .addPage('login', () => {
          fixture.innerHTML = 'loginRouter';
        })
        .addPage('registration', () => {
          fixture.innerHTML = 'registrationRouter';
        })
        .addPage('file-list/:folderId', (params) => {
          fixture.innerHTML = 'file-list-' + params.folderId;
        })
        .addRouteChangeListener(listener)
        .setDefaultPage('registration')
        .setErrorPageCreator(() => {
          fixture.innerHTML = 'ERROR';
        }).build();
      setTimeout(()=>{
        expect(fixture.innerHTML).toBe('registrationRouter');
        window.location.hash = 'login';
        setTimeout(()=>{
          expect(fixture.innerHTML).toBe('loginRouter');
          window.location.hash = 'lgnfin';
          setTimeout(()=>{
            expect(fixture.innerHTML).toBe('ERROR');
            window.location.hash = 'file-list/testId';
            setTimeout(()=>{
              expect(fixture.innerHTML).toBe('file-list-testId');
              window.location.hash = 'file-list/secondTestId';
              setTimeout(()=>{
                expect(listener).toHaveBeenCalledTimes(2);
                done();
              });
            });
          });
        });
      });
    });
  });


  test('Should catch error if arguments in Builder for router are invalid.', () => {
    expect.assertions(1);
    expect(()=>{
      Router.getBuilder()
        .addPage(()=>{
          return 'string';
        });
    }).toThrow('wrong type of arguments');
  });
});
