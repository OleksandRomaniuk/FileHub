import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {inject} from '../application/registry';
import {LoadFolderContentAction} from './load-folder-content-action.js';
/**
 * Action to execute edit file or folder.
 */
export class EditItemAction extends BaseAction {
    @inject apiService;
    @inject stateManagementService;
    #itemModel;

    /**
     * @param {object} itemModel
     */
    constructor(itemModel) {
      super();
      this.#itemModel = itemModel;
    }
    /**
     * @inheritDoc
     * @param {Function} mutationExecutor
     */
    execute(mutationExecutor) {
      mutationExecutor(MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE, {item: this.#itemModel});
      mutationExecutor(MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS, true);
      return this.apiService.rename(this.#itemModel)
        .then(() => {
          mutationExecutor(MUTATOR_NAME.SET_ITEM_IN_RENAMING_STATE, null);
          if (this.#itemModel.parentId === this.stateManagementService.state.locationMetaData.dynamicParams.folderId) {
            this.stateManagementService.dispatch(
              new LoadFolderContentAction(
                this.#itemModel.parentId));
          }
        })
        .catch((e) => {
          mutationExecutor(MUTATOR_NAME.SET_ITEM_RENAMING_ERROR_STATE, e);
        })
        .finally(() => {
          mutationExecutor(MUTATOR_NAME.SET_ITEM_IS_RENAMING_IN_PROGRESS, false);
        });
    }
}
