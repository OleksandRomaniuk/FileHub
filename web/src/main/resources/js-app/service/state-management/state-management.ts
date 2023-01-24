import {BaseAction} from '../../actions/base-action';
import {State} from './state';
type Mutator = { [n: string]: (state: State, field: boolean | object | string) => State };

/**
 * It determines what data is displayed on the screen during the app usage session while the user interacts with it.
 */
export class StateManagementService {
  private readonly _eventTarget: EventTarget;

  private readonly _mutators: Mutator;

  private _state: State;

  /**
   * @param {Mutator} mutators
   * @param {State} state
   */
  constructor(mutators: Mutator, state: State) {
    if (state == null) {
      throw new Error('Initial state is not valid');
    } else if (mutators === undefined) {
      throw new Error('Mutators are not valid');
    }
    this._eventTarget = new EventTarget();
    this._mutators = mutators;
    this._state = state;
  }

  /**
   * Change value of states.
   * @param {string} mutatorKey
   * @param {object | string | boolean} payload
   * @returns {State}
   */
  #mutate(mutatorKey: keyof Mutator, payload: object | string | boolean) : State {
    return this._mutators[mutatorKey](this._state, payload);
  }

  /**
   * Dispatch event on filed that was changed.
   * @param {BaseAction} action
   */
  dispatch(action: BaseAction) :void {
    action.execute((mutatorKey, payload) => {
      const newState = this.#mutate(mutatorKey, payload);
      const clonedState = new State(this.state);
      this._state = new State(newState);
      Object.entries(newState).forEach(([key])=>{
        if (clonedState[key as keyof State] !== newState[key as keyof State]) {
          this._eventTarget.dispatchEvent(new CustomEvent(`stateChanged.${key}`, {
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
    return this._state;
  }


  /**
   * Add action for the field in state.
   * @param {string} fieldName
   * @param {function(State): void} listener
   * @returns {function(CustomEvent): void}
   */
  addStateListener(fieldName: string, listener: (state: State) => void) {
    listener(this._state);
    const listenerForField = (event: CustomEvent) => listener(event.detail as State);
    this._eventTarget.addEventListener(`stateChanged.${fieldName}`, listenerForField as EventListener);
    return listenerForField;
  }

  /**
   * Delete certain action for the field in state.
   * @param {string} fieldName
   * @param {EventListener} listener
   */
  removeStateListener(fieldName: string, listener: EventListener) {
    this._eventTarget.removeEventListener(`stateChanged.${fieldName}`, listener);
  }
}
