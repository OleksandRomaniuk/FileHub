import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {BaseAction} from './base-action';

/**
 * Action to set new folder in the state.
 */
export class SetNewFolderAction extends BaseAction {
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
      mutationExecutor(MUTATOR_NAME.SET_NEW_FOLDER, this.#item);
    }
}
