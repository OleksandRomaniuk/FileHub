
/**
 * Abstract class for the action.
 */
export class BaseAction {
  /**
   * Execute changing states.
   * @abstract
   * @param {function(string, object): void} mutationExecutor
   */
  execute(mutationExecutor) {}
}
