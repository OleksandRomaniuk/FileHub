import {RouterConfig} from '../../router/router-config.js';
import {Router} from '../../router/router.js';
import {jest} from '@jest/globals';

describe('Hash router test', () => {
  test('Should throw error with non configured builder', function() {
    expect.assertions(1);

    expect(() => {
      RouterConfig.getBuilder().build();
    }).toThrow('Handler for route to \'404 not found page\' is not defined.');
  });

  test('Should throw error with invalid arguments in hash router builder', function() {
    const invalidArguments = [
      [1, () => {}],
      ['', 1],
      [null, () => {}],
      ['', null],
    ];

    expect.assertions(invalidArguments.length);

    for (const testValue of invalidArguments) {
      expect(() => RouterConfig.getBuilder().addRoute(testValue[0], testValue[1]).build())
          .toThrow();
    }
  });

  test('Should throw error with undefined home page', function() {
    expect.assertions(1);

    expect(() => {
      RouterConfig.getBuilder()
          .addRoute('route', () => {})
          .addRouteToNotFound(() => {})
          .build();
    }).toThrow('Route to home page is not defined');
  });

  test('Should throw error with undefined error page', function() {
    expect.assertions(1);

    expect(() => {
      RouterConfig.getBuilder()
          .addRoute('', () => {})
          .addRouteToHome('home')
          .build();
    }).toThrow('Handler for route to \'404 not found page\' is not defined.');
  });

  test('Should throw error with defined home route and undefined handler for it', function() {
    expect.assertions(1);

    expect(() => {
      RouterConfig.getBuilder()
          .addRoute('1', () => {})
          .addRouteToHome('home')
          .addRouteToNotFound(() => {})
          .build();
    }).toThrow('Route for home page is defined, ' +
        'but there is no such page. Please define it with \'addRoute\' method.');
  });

  test('Should change hash in URL', () => {
    const routerConfig = RouterConfig.getBuilder()
        .addRoute('home', () => {})
        .addRouteToHome('home')
        .addRouteToNotFound(() => {})
        .build();

    const router = new Router(routerConfig);
    router.redirect('home');
    expect(window.location.hash).toBe('#home');
  });

  test('Should execute handler functions when hash changed', () => {
    return new Promise((done) => {
      const loginMock = jest.fn();
      const registerMock = jest.fn();
      const errorMock = jest.fn();

      const routerConfig = RouterConfig.getBuilder()
          .addRouteToHome('login')
          .addRouteToNotFound(errorMock)
          .addRoute('register', registerMock)
          .addRoute('login', loginMock).build();

      expect.assertions(6);

      window.location.hash = '';

      const router = new Router(routerConfig);
      setTimeout(() => {
        expect(window.location.hash).toBe('#login');
        expect(loginMock).toHaveBeenCalled();

        router.redirect('register');

        setTimeout(() => {
          expect(window.location.hash).toBe('#register');
          expect(registerMock).toHaveBeenCalledTimes(1);

          router.redirect('1');

          setTimeout(() => {
            expect(window.location.hash).toBe('#1');
            expect(errorMock).toHaveBeenCalledTimes(1);
            done();
          });
        });
      });
    });
  });
});
