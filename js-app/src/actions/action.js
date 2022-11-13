/**
 * Abstract action class that must be inherited by all actions.
 */
export class Action {
  payload;

  /**
   * Execute an action and mutate the state.
   * @abstract
   */
  execute() {
  }
}
