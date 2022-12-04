import {Action} from '../actions/action.js';
import {State} from '../state/state.js';

/**
 * Service that manage the state of application.
 */
export class StateManagementService {
  #eventTarget;
  #mutators;
  #state;

  /**
   * @param {{}} mutators
   * @param {State} state
   */
  constructor(mutators, state) {
    this.#eventTarget = new EventTarget();
    this.#mutators = mutators || {};
    this.#state = state;
  }

  /**
   * @param {string} mutatorKey
   * @param {any} payload
   * @throws {Error} - In case of mutator is not a function.
   * @private
   */
  #mutate(mutatorKey, payload) {
    if (typeof this.#mutators[mutatorKey] !== 'function') {
      throw new Error(`Expected function but ${typeof this.#mutators[mutatorKey]} provided.`);
    }

    const newState = this.#mutators[mutatorKey](this.#state, payload);

    const proxyState = new Proxy(({...this.#state}), {
      set: (state, key, value) => {
        const isValueDifferent = Reflect.get(state, key) !== value;
        const successfullyChanged = Reflect.set(state, key, value);
        if (successfullyChanged && isValueDifferent) {
          this.#eventTarget.dispatchEvent(new CustomEvent(`stateChanged.${key}`, {
            detail: this.#state,
          }));
        }
        return successfullyChanged;
      },
    });

    this.#state = newState;

    Object.assign(proxyState, this.#state);
  }

  /**
   * Dispatches action for watching the state.
   * @param {Action} action
   */
  dispatch(action) {
    action.execute((mutatorKey, payload) => {
      this.#mutate(mutatorKey, payload);
    });
  }

  /**
   * @returns {State}
   */
  get state() {
    return this.#state;
  }

  /**
   * Removes concrete event listener from event target.
   * @param {string} fieldName
   * @param {string} listener
   */
  removeStateListener(fieldName, listener) {
    this.#eventTarget.removeEventListener(`stateChanged.${fieldName}`, listener);
  }

  /**
   * Adds listener for state change event.
   * @param {string} fieldName
   * @param {Function} listener
   * @returns {Function}
   */
  addStateListener(fieldName, listener) {
    listener(this.#state);
    const listenerFunction = (event) => listener(event.detail);
    this.#eventTarget.addEventListener(`stateChanged.${fieldName}`,
        listenerFunction);
    return listenerFunction;
  }
}
