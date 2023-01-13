import {StateAwareComponent} from '../../components/state-aware-component';
import {jest} from '@jest/globals';
import {ApplicationContext} from '../../application/application-context';
import {StateManagementService} from '../../service/state-management/state-management-service';

/**
 * Spy class for state aware component.
 */
class TestStateAwareComponent extends StateAwareComponent {
  /**
   * @param {HTMLElement} parent
   * @param {StateManagementService} stateManagementService
   */
  constructor(parent, stateManagementService) {
    super(parent, stateManagementService);
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

      const applicationContext = new ApplicationContext();

      const returnedMock = jest.fn();

      const addStateListenerMock = jest.spyOn(applicationContext.stateManagementService, 'addStateListener')
          .mockImplementation(() => {
            return returnedMock;
          });
      const removeStateListenerMock = jest.spyOn(applicationContext.stateManagementService, 'removeStateListener');

      new TestStateAwareComponent(fixture.firstElementChild, applicationContext.stateManagementService);

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
