import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {inject} from '../application/registry';
import {LoadFolderContentAction} from './load-folder-content-action.js';
/**
 * Action to execute upload files in the folder.
 */
export class UploadFilesAction extends BaseAction {
    @inject apiService;
    @inject stateManagementService;
    #folderId;
    #files;

    /**
     * @param {string} folderId
     * @param {object} files
     */
    constructor(folderId, files) {
      super();
      this.#folderId = folderId;
      this.#files = files;
    }
    /**
     * @inheritDoc
     * @param {Function} mutationExecutor
     */
    execute(mutationExecutor) {
      mutationExecutor(MUTATOR_NAME.SET_UPLOADING_FILES, {
        folderId: this.#folderId,
      });
      return this.apiService.uploadFiles(this.#folderId, this.#files)
        .then(() => {
          if (this.#folderId === this.stateManagementService.state.locationMetaData.folderId) {
            this.stateManagementService.dispatch(
              new LoadFolderContentAction(
                this.#folderId));
          }
        })
        .catch(() => {
          mutationExecutor(MUTATOR_NAME.SET_UPLOADING_FILES_ERROR, {
            folderId: this.#folderId,
          });
        })
        .finally(() => {
          mutationExecutor(MUTATOR_NAME.SET_UPLOADING_FILES, null);
        });
    }
}
