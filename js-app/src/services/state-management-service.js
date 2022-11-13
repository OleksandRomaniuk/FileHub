export class StateManagementService {
  #eventTarget;
  #mutators;
  #state;

  constructor(mutators, state) {
    this.#eventTarget = new EventTarget();
    this.#mutators = mutators || {};
    this.#state = new Proxy((state || {}), {
      set: (state, key, value) => {
        const changed = Reflect.set(state, key, value);
        if (changed) {
          this.#eventTarget.dispatchEvent(new CustomEvent(`stateChanged.${key}`, {
            detail: state,
          }));
        }
        return changed;
      },
    });
  }

  #mutate(mutatorKey, payload) {
    if (typeof this.#mutators[mutatorKey] !== 'function') {
      throw new Error(`Expected function but ${typeof this.#mutators[mutatorKey]} provided.`);
    }

    const newState = this.#mutators[mutatorKey](this.#state, payload);
    this.#state = Object.assign(this.#state, newState);

    return true;
  }

  dispatch(action) {
    return action.execute((mutatorKey, payload) => {
      this.#mutate(mutatorKey, payload);
    });
  }

  get state() {
    return Object.freeze(Object.assign({}, this.#state));
  }

  addStateListener(fieldName, listener) {
    listener(this.#state);
    this.#eventTarget.addEventListener(`stateChanged.${fieldName}`,
        (event) => listener(event.detail));
  }
}
