import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {LoadFolderContentAction} from './load-folder-content-action';
import {inject} from '../application/registry';

/**
 * Action to execute creating new folder.
 */
export class CreateFolderAction extends BaseAction {
    @inject apiService;
    @inject stateManagementService;
    #folder;

    /**
     * @param {object} folder
     */
    constructor(folder) {
      super();
      this.#folder = folder;
    }
    /**
     * @inheritDoc
     * @param {function(string, object) :void} mutationExecutor
     */
    execute(mutationExecutor) {
      mutationExecutor(MUTATOR_NAME.SET_NEW_FOLDER, this.#folder);
      mutationExecutor(MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED, true);
      return this.apiService.createFolder(this.#folder)
        .then(()=>{
          mutationExecutor(MUTATOR_NAME.SET_NEW_FOLDER, null);
          if (this.#folder.parentId === this.stateManagementService.state.locationMetaData.dynamicParams.folderId) {
            this.stateManagementService.dispatch(
              new LoadFolderContentAction(
                this.stateManagementService.state.locationMetaData.dynamicParams.folderId));
          }
        })
        .catch((error)=>{
          mutationExecutor(MUTATOR_NAME.SET_CREATING_FOLDER_ERROR, error);
        })
        .finally(()=>{
          mutationExecutor(MUTATOR_NAME.SET_FOLDER_IS_BEING_CREATED, false);
        });
    }
}

