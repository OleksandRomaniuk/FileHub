import {Action} from './action.js';
import {MUTATOR_NAME} from '../constants/mutators.js';

/**
 * Action for changing location and metadata inside state.
 */
export class ChangeLocationAction extends Action {
  #routePath;
  #routeMetaData;

  /**
   * @param {string} routePath
   * @param {{}} routeMetaData
   */
  constructor(routePath, routeMetaData) {
    super();
    this.#routePath = routePath;
    this.#routeMetaData = routeMetaData;
  }

  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_LOCATION, this.#routePath);
    mutationExecutor(MUTATOR_NAME.SET_LOCATION_METADATA, this.#routeMetaData);
  }
}
