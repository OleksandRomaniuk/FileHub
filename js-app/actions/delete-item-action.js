import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {LoadFolderContentAction} from './load-folder-content-action';
import {inject} from '../application/registry';

/**
 * Action to execute loading information about files and folders in the folder.
 */
export class DeleteItemAction extends BaseAction {
    @inject apiService;
    @inject stateManagementService;
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
     * @param {function(string, object) :void} mutationExecutor
     */
    execute(mutationExecutor) {
      mutationExecutor(MUTATOR_NAME.SET_ITEM_BEING_DELETE, true);
      return this.apiService.deleteItem(this.#item)
        .then(()=>{
          mutationExecutor(MUTATOR_NAME.SET_ITEM_IN_REMOVING_STATE, null);
          this.stateManagementService.dispatch(
            new LoadFolderContentAction(
              this.stateManagementService.state.folderInfo.id));
        })
        .catch((error)=>{
          mutationExecutor(MUTATOR_NAME.SET_REMOVING_ERROR, error);
        })
        .finally(()=>{
          mutationExecutor(MUTATOR_NAME.SET_ITEM_BEING_DELETE, false);
        });
    }
}

