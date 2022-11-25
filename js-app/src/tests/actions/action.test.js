import {Action} from '../../actions/action.js';

describe('Action', () => {
  test('Should throw error when execute method is not overridden', () => {
    /**
     * Test action inheritor class that doesn't override execute method.
     */
    class TestAction extends Action {}

    const testAction = new TestAction();

    expect(testAction.execute).toThrow('Method execute() must be overridden by the inheritor');
  });
});
