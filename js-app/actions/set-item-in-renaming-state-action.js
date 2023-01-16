import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {BaseAction} from './base-action';

/**
 * Action to set item in renaming state.
 */
export class SetItemInRenamingStateAction extends BaseAction {
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
      mutationExecutor(MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE, {item: this.#item});
    }
}
