import {MUTATOR_NAME} from '../service/state-management/constatns/mutators.js';
import {BaseAction} from './base-action';

/**
 * Action to set load metadata in the state.
 */
export class SetItemInRemovingStateAction extends BaseAction {
  #item;

  /**
   * @param {object} item
   */
  constructor(item) {
    super();
    this.#item = item;
  }
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_ITEM_IN_REMOVING_STATE, this.#item);
  }
}
