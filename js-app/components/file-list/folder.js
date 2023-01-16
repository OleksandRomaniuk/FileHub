import {Link} from '../link';
import {Component} from '../component';

const DELETE_FOLDER_EVENT = 'delete_folder_event';
const UPLOAD_FILES_EVENT = 'upload_files_event';
const NAVIGATE_FOLDER_EVENT = 'navigate_folder_event';
const EDIT_EVENT = 'edit-event';
const RENAME_EVENT = 'rename-event';
/**
 * The component for generate information about folder.
 */
export class Folder extends Component {
  #folder;
  #isUploading;
  #uploadError;
  #submitTarget = new EventTarget();
  #itemInRenamingState;
  #isRenamingInProgress;
  #renamingError;
  /**
   * @typedef {object} Folder
   * @property {string} type
   * @property {string} name
   * @property {string} size
   * @property {string} id
   */
  /**
   * @typedef {object} FolderConfig
   * @property {Folder} folder
   * @property {boolean} isUploading
   * @property {string} uploadError
   * @property {object} itemInRenamingState
   * @property {boolean} isRenamingInProgress
   * @property {object} renamingError
   */
  /**
   * @param {HTMLElement} parent
   * @param {FolderConfig} folderConfig
   */
  constructor(parent,
    {
      folder,
      isUploading,
      uploadError,
      itemInRenamingState,
      isRenamingInProgress,
      renamingError,
    },
  ) {
    super(parent);
    this.#folder = folder;
    this.#isUploading = isUploading;
    this.#uploadError = uploadError;
    this.#itemInRenamingState = itemInRenamingState;
    this.#isRenamingInProgress = isRenamingInProgress;
    this.#renamingError = renamingError;
    this.init();
  }
  /**
   * @inheritDoc
   */
  afterRender() {
    const linkNameFolderSlot = this.getSlot('link-slot-folder');
    if (linkNameFolderSlot) {
      const link = new Link(linkNameFolderSlot, this.#folder.name);
      link.onClick(()=> {
        this.#submitTarget.dispatchEvent(new Event(NAVIGATE_FOLDER_EVENT));
      });
    }

    const linkDelete = this.getSlot('link-delete');
    linkDelete.addEventListener(('click'), (e)=>{
      e.preventDefault();
      this.#submitTarget.dispatchEvent(new Event(DELETE_FOLDER_EVENT));
    });
    const linkUpload = this.getSlot('link-upload');
    linkUpload.addEventListener(('click'), (e)=>{
      e.preventDefault();
      this.#submitTarget.dispatchEvent(new Event(UPLOAD_FILES_EVENT));
    });
    this.rootElement.addEventListener('dblclick', (e)=>{
      e.preventDefault();
      this.#submitTarget.dispatchEvent(new Event(EDIT_EVENT));
    });
    const input = this.rootElement.querySelector('input.name');
    if (input && this.#itemInRenamingState) {
      input.focus();
      input.addEventListener('change', (e)=>{
        e.preventDefault();
        const clonedFolder = this.#folder;
        this.#folder = {...clonedFolder, name: input.value};
        this.#submitTarget.dispatchEvent(new Event(RENAME_EVENT));
      });
      input.addEventListener('focusout', (e)=>{
        e.preventDefault();
        this.#itemInRenamingState = null;
        this.render();
      });
    }
  }

  /**
   * @param {Folder} folder
   */
  set folder(folder) {
    this.#folder = folder;
    this.render();
  }
  /**
   * @param {boolean} isUploading
   */
  set isUploading(isUploading) {
    this.#isUploading = isUploading;
    this.render();
  }
  /**
   * @param {string} uploadError
   */
  set uploadError(uploadError) {
    this.#uploadError = uploadError;
    this.render();
  }
  /**
   * @param {object} itemInRenamingState
   */
  set itemInRenamingState(itemInRenamingState) {
    this.#itemInRenamingState = itemInRenamingState;
    this.render();
  }
  /**
   * @param {boolean} isRenamingInProgress
   */
  set isRenamingInProgress(isRenamingInProgress) {
    this.#isRenamingInProgress = isRenamingInProgress;
    this.render();
  }
  /**
   * @param {string} renamingError
   */
  set renamingError(renamingError) {
    this.#renamingError = renamingError;
    this.render();
  }
  /**
   * Set listener to delete the folder.
   * @param {function(string) :void} listenerOnDeleteFile
   */
  onDelete(listenerOnDeleteFile) {
    this.#submitTarget.addEventListener(DELETE_FOLDER_EVENT, ()=> {
      listenerOnDeleteFile(this.#folder);
    });
  }
  /**
   * Set listener to upload files in the folder.
   * @param {function(string) :void} listenerOnUploadFile
   */
  onUpload(listenerOnUploadFile) {
    this.#submitTarget.addEventListener(UPLOAD_FILES_EVENT, ()=> {
      listenerOnUploadFile(this.#folder.id);
    });
  }

  /**
   * Add listener to redirect to the another folder.
   * @param {function(object) :void} listenerNavigateToFolder
   */
  onNavigateToFolder(listenerNavigateToFolder) {
    this.#submitTarget.addEventListener(NAVIGATE_FOLDER_EVENT, () => {
      listenerNavigateToFolder(this.#folder.id);
    });
  }
  /**
   * Add event listener for double-click on row.
   * @param {function(object): void} listenerOnEdit
   */
  onEditing(listenerOnEdit) {
    this.#submitTarget.addEventListener(EDIT_EVENT, () => {
      listenerOnEdit(this.#folder);
    });
  }
  /**
   * Add event listener for changing value in input.
   * @param {function(object): void} listenerOnRename
   */
  onNameChanged(listenerOnRename) {
    this.#submitTarget.addEventListener(RENAME_EVENT, () => {
      listenerOnRename(this.#folder);
    });
  }


  /**
   * @inheritDoc
   */
  markup() {
    let innerText;
    let name;
    if (this.#itemInRenamingState && this.#renamingError) {
      name = `<td class="cell-name input">
                        <input class="input-text name" value="${this.#itemInRenamingState.item.name}">
                           <div class="error-text">
                           ${this.#renamingError}
                        </div>
                    </td>`;
    } else if (this.#itemInRenamingState && this.#isRenamingInProgress) {
      name = `<td class="cell-name input">
                        <input class="input-text name" value="${this.#itemInRenamingState.item.name}">
                          <span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>
                    </td>`;
    } else if (this.#itemInRenamingState) {
      name = `<td class="cell-name input">
                        <input class="input-text name" value="${this.#folder.name}">
                    </td>`;
    } else {
      name = `<td class="cell-name folder">
                   ${this.addSlot('link-slot-folder')}
                    </td>`;
    }
    if (this.#folder) {
      const disabled = this.#isUploading ? 'disabled' : '';
      let linkUpload;
      if (this.#isUploading) {
        linkUpload = `<span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>`;
      } else if (this.#uploadError) {
        linkUpload = `<span class="glyphicon glyphicon-exclamation-sign error" aria-hidden="true"></span>`;
      } else {
        linkUpload = `<span class="glyphicon glyphicon-upload" aria-hidden="true" ></span>`;
      }
      innerText = `
            <tr>
                    <td class="cell-arrow">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    </td>
                    <td class="cell-icon">
                       <span class="glyphicon glyphicon-folder-close" aria-hidden="true">
                       </span>
                    </td>
                     ${name}
                    <td class="cell-type">
                        Folder
                    </td>
                    <td class="cell-size">
                        —
                    </td>
                    <td class="cell-buttons">
                        <div class="button-hidden">
                            <a href="#" class="green-button ${disabled}" ${this.markElement('link-upload')}>
                                ${linkUpload}
                            </a>
                            <a href="#" class="red-button"  ${this.markElement('link-delete')} >
                                <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                            </a>
                        </div>
                    </td>
                </tr>`;
    }
    return `${innerText}`;
  }
}

