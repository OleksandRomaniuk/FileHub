import {Component} from './component.js';
import {TableError} from './table-error.js';
import {TableLoading} from './table-loading.js';
import {File} from './file.js';
import {Folder} from './folder.js';

const FOLDER_TYPE = 'Folder';

const FOLDER_NAVIGATE_EVENT = 'folder-navigate-event';

/**
 * Table component.
 */
export class FileList extends Component {
  #fileListParams;
  #fileListContentCreator;
  #eventTarget = new EventTarget;

  /**
   * @typedef Entity
   * @property {string} name
   * @property {string} type
   * @property {string} size
   * @property {string} id
   */

  /**
   * @typedef FileListParams
   * @property {string} errorMessage
   * @property {boolean} isFileListLoading
   * @property {Entity[]} fileListEntities
   */

  /**
   * @param {HTMLElement} parent
   * @param {FileListParams} params
   */
  constructor(parent, params) {
    super(parent);
    this.#fileListParams = params;
    if (params.errorMessage) {
      this.#showError(params.errorMessage);
    }
    if (params.isFileListLoading) {
      this.#showLoading();
    }
    if (params.fileListEntities) {
      this.#showTableContent(params.fileListEntities);
    }
    this.init();
  }

  /**
   * @param {string} errorMessage
   * @private
   */
  #showError(errorMessage) {
    this.#fileListContentCreator = (slot) => {
      new TableError(slot, errorMessage);
    };
    this.render();
  }

  /**
   * @private
   */
  #showLoading() {
    this.#fileListContentCreator = (slot) => {
      new TableLoading(slot);
    };
    this.render();
  }

  /**
   * @param {Entity[]} entities
   * @private
   */
  #showTableContent(entities) {
    this.#fileListContentCreator = (slot) => {
      entities.forEach((entity) => {
        if (entity.type === FOLDER_TYPE) {
          const folder = new Folder(slot, entity.name, entity.id);
          folder.onNavigate((folderId) => {
            this.#eventTarget.dispatchEvent(new CustomEvent(FOLDER_NAVIGATE_EVENT, {detail: folderId}));
          });
        } else {
          new File(slot, entity);
        }
      });
    };
    this.render();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('file-list');
    if (this.#fileListContentCreator) {
      this.#fileListContentCreator(slot);
    }
  }

  /**
   * Adds listener for 'folder navigate' event.
   * @param {Function} listener
   */
  onNavigate(listener) {
    this.#eventTarget.addEventListener(FOLDER_NAVIGATE_EVENT, (event) => {
      listener(event.detail);
    });
  }

  /**
   * @inheritDoc
   */
  markup() {
    if (this.#fileListParams.errorMessage || this.#fileListParams.isFileListLoading) {
      return `${this.addSlot('file-list')}`;
    }
    return `<div class="file-table-wrapper">
                <table class="file-table">
                    <tbody ${this.markElement('file-list')}></tbody>
                </table>
            </div>`;
  }
}
