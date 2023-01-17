import {Component} from '../component';
import {FileTypeIconFactory} from './file-type-icon-factory';
import {Folder} from './folder';
import {File} from './file';

/**
 * The component for generate file and folder list.
 */
export class Table extends Component {
  #items;
  #isError;
  #isLoading;
  #listenerNavigateToFolder;
  #fileTypeIconFactory;
  #deleteListener;
  /**
   * @param {HTMLElement} parent
   * @param {object} folderContent
   * @param {boolean} isLoading
   * @param {boolean} isError
   */
  constructor(parent, folderContent, isLoading, isError ) {
    super(parent);
    if (folderContent) {
      this.#items = folderContent.items;
    }
    this.#isLoading = isLoading;
    this.#isError = isError;
    this.#fileTypeIconFactory = new FileTypeIconFactory();
    this.init();
  }
  /**
   * @inheritDoc
   */
  afterRender() {
    const tableSlot = this.getSlot('table');
    if (tableSlot) {
      this.#items
        ?.filter((element) => element.type === 'folder')
        .forEach((folder)=>{
          const folderComponent = new Folder(tableSlot, folder);
          folderComponent.onNavigateToFolder(this.#listenerNavigateToFolder);
          folderComponent.onDelete(this.#deleteListener);
        });
      this.#items
        ?.filter((element) => element.type !== 'folder')
        .forEach((file)=>{
          const fileComponent = new File(tableSlot, file);
          fileComponent.onDelete(this.#deleteListener);
        });
    }
  }

  /**
   * Add listener to redirect to the another folder.
   * @param {function(string) :void} listenerNavigateToFolder
   */
  onNavigateToFolder(listenerNavigateToFolder) {
    this.#listenerNavigateToFolder = listenerNavigateToFolder;
    this.render();
  }

  /**
   * Add listener to delete file or folder.
   * @param {function(object) :void} deleteListener
   */
  onDeleteItem(deleteListener) {
    this.#deleteListener = deleteListener;
    this.render();
  }
  /**
   * @inheritDoc
   */
  markup() {
    let innerText;
    if (this.#isLoading) {
      innerText = `<div class="center-text loading-table">
                <span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>
            </div>`;
    } else if (this.#isError) {
      innerText = ` <div class="center-text error-text">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                Can't load directory data
            </div>`;
    } else if (this.#items) {
      innerText = `<table class="all-elements"><tbody data-td="table"></tbody></table>`;
    }
    return `<slot>${innerText}</slot>`;
  }
}
