import {BaseAction} from './base-action';
import {MUTATOR_NAME} from '../service/state-management/constatns/mutators';
import {inject} from '../application/registry';

/**
 * Action to execute download the file.
 */
export class DownloadAction extends BaseAction {
    @inject downloadService;
    #item;

    /**
     * @typedef {object} File
     * @property {string} type
     * @property {string} mimetype
     * @property {string} name
     * @property {string} size
     * @property {string} id
     * @property {string} parentId
     */
    /**
     * @param {File} item
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
      mutationExecutor(MUTATOR_NAME.SET_ITEM_IN_DOWNLOAD_STATE, {item: this.#item});
      return this.downloadService.download(this.#item)
        .catch((error)=>{
          mutationExecutor(MUTATOR_NAME.SET_DOWNLOAD_ERROR, {
            error: error,
            itemId: this.#item.id,
          });
        }).finally(()=>{
          mutationExecutor(MUTATOR_NAME.SET_ITEM_IN_DOWNLOAD_STATE, null);
        });
    }
}

