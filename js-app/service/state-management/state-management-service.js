import {BaseAction} from '../../actions/base-action.js';
import {State} from './state';

/**
 * It determines what data is displayed on the screen during the app usage session while the user interacts with it.
 */
export class StateManagementService {
  #eventTarget;
  #mutators;
  #state;


  /**
   * @typedef Mutator
   * @property {string} field
   * @property {Function} function
   */

  /**
   * @param {Mutator} mutators
   * @param {State} state
   */
  constructor(mutators, state) {
    if (state == null) {
      throw new Error('Initial state is not valid');
    } else if (mutators === undefined) {
      throw new Error('Mutators are not valid');
    }
    this.#eventTarget = new EventTarget();
    this.#mutators = mutators;
    this.#state = state;
  }

  /**
   * Change value of states.
   * @param {string} mutatorKey
   * @param {Function} payload
   * @returns {boolean | State}
   */
  #mutate(mutatorKey, payload) {
    return this.#mutators[mutatorKey](this.#state, payload);
  }

  /**
   * Dispatch event on filed that was changed.
   * @param {BaseAction} action
   */
  dispatch(action) {
    action.execute((mutatorKey, payload) => {
      const newState = this.#mutate(mutatorKey, payload);
      const clonedState = new State(this.#state);
      this.#state = new State(newState);
      Object.entries(newState).forEach(([key])=>{
        if (clonedState[key] !== newState[key]) {
          this.#eventTarget.dispatchEvent(new CustomEvent(`stateChanged.${key}`, {
            detail: newState,
          }));
        }
      });
    });
  }

  /**
   * @returns {object}
   */
  get state() {
    return this.#state;
  }


  /**
   * Add action for the field in state.
   * @param {string} fieldName
   * @param {Function} listener
   * @returns {function(*): *}
   */
  addStateListener(fieldName, listener) {
    listener(this.#state);
    const listenerForField = (event) => listener(event.detail);
    this.#eventTarget.addEventListener(`stateChanged.${fieldName}`,
        listenerForField);
    return listenerForField;
  }

  /**
   * Delete certain action for the field in state.
   * @param {string} fieldName
   * @param {Function} listener
   */
  removeStateListener(fieldName, listener) {
    this.#eventTarget.removeEventListener(`stateChanged.${fieldName}`, listener);
  }
}
