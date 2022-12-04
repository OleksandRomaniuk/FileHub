import {MUTATOR_NAME} from '../constants/mutators.js';
import {ApiService} from '../rest/api-service.js';
import {Action} from './action.js';

/**
 * Action for getting content for current folder.
 */
export class FolderContentAction extends Action {
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
    mutationExecutor(MUTATOR_NAME.SET_IS_FILE_LIST_LOADING, true);

    return this.#apiService.getFolderContent(this.#folderId)
        .then((folderContent) => {
          mutationExecutor(MUTATOR_NAME.SET_FOLDER_CONTENT, folderContent);
        })
        .catch((error) => {
          mutationExecutor(MUTATOR_NAME.SET_FILE_LIST_ERROR, error.getError());
        })
        .finally(() => {
          mutationExecutor(MUTATOR_NAME.SET_IS_FILE_LIST_LOADING, false);
        });
  }
}
