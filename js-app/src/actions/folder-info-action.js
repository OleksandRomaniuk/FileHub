import {FileModel} from '../state/file-model.js';
import {Action} from './action.js';
import {MUTATOR_NAME} from '../constants/mutators.js';
import {ApiService} from '../rest/api-service.js';

/**
 * Action for getting information about current folder.
 */
export class FolderInfoAction extends Action {
  #apiService;
  #folderId;

  /**
   * @param {ApiService} apiService
   * @param {string} folderId
   */
  constructor(apiService, folderId) {
    super();
    this.#apiService = apiService;
    this.#folderId = folderId;
  }

  /**
   * @inheritDoc
   * @param {Function} mutationExecutor
   * @returns {Promise}
   */
  execute(mutationExecutor) {
    mutationExecutor(MUTATOR_NAME.SET_IS_LOADING_BREADCRUMB, true);
    mutationExecutor(MUTATOR_NAME.SET_IS_FILE_LIST_LOADING, true);

    return this.#apiService.getFolder(this.#folderId)
        .then((folderModel) => {
          mutationExecutor(MUTATOR_NAME.SET_CURRENT_FOLDER, new FileModel(folderModel));
        })
        .catch((error) => {
          mutationExecutor(MUTATOR_NAME.SET_BREADCRUMB_ERROR, error.getError());
        })
        .finally(() => {
          mutationExecutor(MUTATOR_NAME.SET_IS_LOADING_BREADCRUMB, false);
        });
  }
}
