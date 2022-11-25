import {Component} from './component.js';
import {StateManagementService} from '../services/state-management-service.js';

/**
 * Component that aware of state management service.
 * Must be inherited by all components that use state management service.
 */
export class StateAwareComponent extends Component {
  #stateManagementService;
  #listeners = [];

  /**
   * @inheritDoc
   */
  init() {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node.isEqualNode(this.rootElement)) {
            this.willDestroy();
          }
        });
      });
    });

    observer.observe(this.parentElement, {childList: true});
    super.init();
  }

  /**
   * @param {HTMLElement} parent
   * @param {StateManagementService} stateManagementService
   */
  constructor(parent, stateManagementService) {
    super(parent);
    this.#stateManagementService = stateManagementService;
  }

  /**
   * Adds state listener to state management service.
   * @param {string} fieldState
   * @param {Function} listener
   */
  addStateListener(fieldState, listener) {
    const stateListener = this.#stateManagementService.addStateListener(fieldState, listener);

    this.#listeners.push({field: fieldState, listener: stateListener});
  }

  /**
   * Lifecycle hook that performed when component destroyed.
   */
  willDestroy() {}

  /**
   * Removes all state listeners that was added by inheritor.
   */
  removeStateListener() {
    this.#listeners.forEach(({fieldName, listener}) => {
      this.#stateManagementService.removeStateListener(fieldName, listener);
    });
  }
}
