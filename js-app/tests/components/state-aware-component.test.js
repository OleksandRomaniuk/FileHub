import {StateAwareComponent} from '../../components/state-aware-component';
import {jest} from '@jest/globals';
import {ApplicationContext} from '../../application/application-context';
import {registry} from '../../application/registry.js';

/**
 * Spy class for state aware component.
 */
class TestStateAwareComponent extends StateAwareComponent {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();
  }

  /**
   * @inheritDoc
   */
  init() {
    this.addStateListener('testField', 'listenerFunction');
    super.init();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `<div>Test</div>`;
  }
}

describe('State aware component', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.appendChild(document.createElement('div'));
  });


  test('Should add state listener to state management service', () => {
    return new Promise((done) => {
      expect.assertions(4);

      new ApplicationContext();

      const returnedMock = jest.fn();

      const addStateListenerMock = jest.spyOn(registry.getInstance('stateManagementService'), 'addStateListener')
        .mockImplementation(() => {
          return returnedMock;
        });
      const removeStateListenerMock = jest.spyOn(registry.getInstance('stateManagementService'), 'removeStateListener');

      new TestStateAwareComponent(fixture.firstElementChild);

      expect(addStateListenerMock).toHaveBeenCalledTimes(1);
      expect(addStateListenerMock).toHaveBeenCalledWith('testField', 'listenerFunction');
      fixture.innerHTML = '';
      setTimeout(() => {
        expect(removeStateListenerMock).toHaveBeenCalledTimes(1);
        expect(removeStateListenerMock).toHaveBeenCalledWith('testField', returnedMock);
        done();
      });
    });
  });
});
