import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {ApplicationContext} from '../application/application-context';
import {LoadFolderContentAction} from './load-folder-content-action.js';

/**
 * Action to execute loading information about files and folders in the folder.
 */
export class DeleteItemAction extends BaseAction {
  #applicationContext;
  #item;

  /**
   * @param {ApplicationContext} applicationContext
   * @param {object} item
   */
  constructor(applicationContext, item) {
    super();
    this.#applicationContext = applicationContext;
    this.#item = item;
  }
  /**
   * @inheritDoc
   * @param {function(string, object) :void} mutationExecutor
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_ITEM_BEING_DELETE, true);
    return this.#applicationContext.apiService.deleteItem(this.#item)
        .then(()=>{
          mutationExecutor(MUTATOR_NAME.SET_ITEM_IN_REMOVING_STATE, null);
          this.#applicationContext.stateManagementService.dispatch(
              new LoadFolderContentAction(
                  this.#applicationContext,
                  this.#applicationContext.stateManagementService.state.folderInfo.id));
        })
        .catch((error)=>{
          mutationExecutor(MUTATOR_NAME.SET_REMOVING_ERROR, error);
        })
        .finally(()=>{
          mutationExecutor(MUTATOR_NAME.SET_ITEM_BEING_DELETE, false);
        });
  }
}

