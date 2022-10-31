import {RouterConfig} from '../../router/router-config.js';

const {module, test} = QUnit;

module('Hash router test', () => {
  test('Should throw error with non configured builder', function(assert) {
    assert.expect(2);

    try {
      RouterConfig.getBuilder().build();
    } catch (error) {
      assert.ok(true);
      assert.strictEqual(error.message, 'Value is undefined.', 'Should throw expected error message.' );
    }
  });

  test('Should throw error with invalid arguments in hash router builder', function(assert) {
    const testValues = [
      [1, () => {}],
      ['', 1],
      [null, () => {}],
      ['', null],
    ];

    assert.expect(testValues.length);

    for (const testValue of testValues) {
      try {
        RouterConfig.getBuilder().addRoute(testValue[0], testValue[1]).build();
      } catch (error) {
        assert.ok(true);
      }
    }
  });

  test('Should throw error with undefined home page', function(assert) {
    assert.expect(2);

    try {
      RouterConfig.getBuilder()
          .addRoute('route', () => {})
          .addRouteToNotFound(() => {})
          .build();
    } catch (error) {
      assert.ok(true);
      assert.strictEqual(error.message, 'Value is undefined.', 'Should throw expected error message.' );
    }
  });

  test('Should throw error with undefined error page', function(assert) {
    assert.expect(2);

    try {
      RouterConfig.getBuilder()
          .addRoute('', () => {})
          .addRouteToHome('home')
          .build();
    } catch (error) {
      assert.ok(true);
      assert.strictEqual(error.message, 'Value is undefined.', 'Should throw expected error message.' );
    }
  });

  test('Should throw error with defined home route and undefined handler for it', function(assert) {
    assert.expect(2);

    try {
      RouterConfig.getBuilder()
          .addRoute('1', () => {})
          .addRouteToHome('home')
          .addRouteToNotFound(() => {})
          .build();
    } catch (error) {
      assert.ok(true);
      assert.strictEqual(error.message,
          'Route for home page is defined, but there is no such page. Please define it with \'addRoute\' method.',
          'Should throw expected error message.' );
    }
  });
});
