import {Action} from '../actions/action.js';
import {deepFreeze} from '../utils/deepFreeze.js';
import {ApplicationContext} from '../application-context.js';

/**
 * Service that manage the state of application.
 */
export class StateManagementService {
  #eventTarget;
  #mutators;
  #state;
  #applicationContext;

  /**
   * @param {{}} mutators
   * @param {{}} state
   * @param {ApplicationContext} applicationContext
   */
  constructor(mutators, state, applicationContext) {
    this.#eventTarget = new EventTarget();
    this.#mutators = mutators || {};
    this.#state = deepFreeze(state || {});
    this.#applicationContext = applicationContext;
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

    const newState = this.#mutators[mutatorKey](this.state, payload);

    const proxyState = new Proxy(({...this.#state}), {
      set: (state, key, value) => {
        const isValueDifferent = Reflect.get(state, key) !== value;
        const successfullyChanged = Reflect.set(state, key, value);
        if (successfullyChanged && isValueDifferent) {
          this.#eventTarget.dispatchEvent(new CustomEvent(`stateChanged.${key}`, {
            detail: state,
          }));
        }
        return successfullyChanged;
      },
    });

    this.#state = deepFreeze(newState);

    Object.assign(proxyState, newState);
  }

  /**
   * Dispatches action for watching the state.
   * @param {Action} action
   */
  dispatch(action) {
    action.execute((mutatorKey, payload) => {
      this.#mutate(mutatorKey, payload);
    }, this.#applicationContext);
  }

  /**
   * @returns {{}}
   */
  get state() {
    return Object.freeze(Object.assign({}, this.#state));
  }

  /**
   * Adds listener for state change event.
   * @param {string} fieldName
   * @param {Function} listener
   */
  addStateListener(fieldName, listener) {
    listener(this.#state);
    this.#eventTarget.addEventListener(`stateChanged.${fieldName}`,
        (event) => listener(event.detail));
  }
}
