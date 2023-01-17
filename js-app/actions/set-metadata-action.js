import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {BaseAction} from './base-action';

/**
 * Action to set load metadata in the state.
 */
export class SetMetadataAction extends BaseAction {
  #routerMetaData;

  /**
   * @param {object} routerMetaData
   */
  constructor(routerMetaData) {
    super();
    this.#routerMetaData = routerMetaData;
  }
  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_LOCATION_METADATA, this.#routerMetaData);
  }
}
