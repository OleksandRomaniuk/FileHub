import {RouterConfig} from '../../router/router-config.js';
import {Router} from '../../router/router.js';


describe('Hash router test', () => {
  test('Should throw error with non configured builder', function() {
    expect.assertions(2);

    try {
      RouterConfig.getBuilder().build();
    } catch (error) {
      expect(true).toBe(true);
      expect(error.message).toBe('Value is undefined.');
    }
  });

  test('Should throw error with invalid arguments in hash router builder', function() {
    const testValues = [
      [1, () => {}],
      ['', 1],
      [null, () => {}],
      ['', null],
    ];

    expect.assertions(testValues.length);

    for (const testValue of testValues) {
      try {
        RouterConfig.getBuilder().addRoute(testValue[0], testValue[1]).build();
      } catch (error) {
        expect(true).toBe(true);
      }
    }
  });

  test('Should throw error with undefined home page', function() {
    expect.assertions(2);

    try {
      RouterConfig.getBuilder()
          .addRoute('route', () => {})
          .addRouteToNotFound(() => {})
          .build();
    } catch (error) {
      expect(true).toBe(true);
      expect(error.message).toBe('Value is undefined.');
    }
  });

  test('Should throw error with undefined error page', function() {
    expect.assertions(2);

    try {
      RouterConfig.getBuilder()
          .addRoute('', () => {})
          .addRouteToHome('home')
          .build();
    } catch (error) {
      expect(true).toBe(true);
      expect(error.message).toBe('Value is undefined.');
    }
  });

  test('Should throw error with defined home route and undefined handler for it', function() {
    expect.assertions(2);

    try {
      RouterConfig.getBuilder()
          .addRoute('1', () => {})
          .addRouteToHome('home')
          .addRouteToNotFound(() => {})
          .build();
    } catch (error) {
      expect(true).toBe(true);
      expect(error.message)
          .toBe('Route for home page is defined, ' +
              'but there is no such page. Please define it with \'addRoute\' method.');
    }
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
});
