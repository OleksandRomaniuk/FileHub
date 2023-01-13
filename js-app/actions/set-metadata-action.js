import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {BaseAction} from './base-action';

/**
 * Action to set load metadata in the state.
 */
export class SetMetadataAction extends BaseAction {
  #folderId;

  /**
   * @param {object} folderId
   */
  constructor(folderId) {
    super();
    this.#folderId = folderId;
  }
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_LOCATION_METADATA, this.#folderId);
  }
}
