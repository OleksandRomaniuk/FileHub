/**
 * Abstract action class that must be inherited by all actions.
 */
export class Action {
  /**
   * Execute an action and mutate the state.
   * @abstract
   */
  execute() {
    throw new Error('Method execute() must be overridden by the inheritor');
  }
}
