import {Component} from './component';
import {State} from '../service/state-management/state.js';
import {Observer} from '../service/state-management/removal-observer';
import {inject} from '../application/registry';

/**
 * The component that works with {@link StateManagementService}.
 */
export class StateAwareComponent extends Component {
  @inject stateManagementService;
  #stateListeners = [];

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    Observer.observe(this.parentElement, ()=>{
      this.onDestroy();
    });
  }

  /**
   * Add event for changing state in the {@link StateManagementService}.
   * @param {string} field
   * @param {function(State): void} listener
   */
  addStateListener(field, listener) {
    const stateListener = this.stateManagementService.addStateListener(field, listener);
    this.#stateListeners.push([field, stateListener]);
  }
  /**
   * Remove all event for changing state in the {@link StateManagementService}.
   */
  removeAllStateListeners() {
    this.#stateListeners.forEach(([field, listener])=>{
      this.stateManagementService.removeStateListener(field, listener);
    });
  }

  /**
   * When the component is removed, the method destroy is called to clear the listeners.
   */
  onDestroy() {
    this.removeAllStateListeners();
  }
}
