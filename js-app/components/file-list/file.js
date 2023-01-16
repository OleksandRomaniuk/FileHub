import {Component} from '../component';
import {inject} from '../../application/registry';

const DELETE_FILE_EVENT = 'delete_file_event';
const EDIT_EVENT = 'edit-event';
const RENAME_EVENT = 'rename-event';
/**
 * The component for generate information about file.
 */
export class File extends Component {
  #file;
  #submitTarget = new EventTarget();
  #itemInRenamingState;
  #isRenamingInProgress;
  #renamingError;
  @inject fileTypeIconFactory;
  #type;
  #icon;

  /**
   * @typedef {object} File
   * @property {string} type
   * @property {string} name
   * @property {string} size
   * @property {string} id
   */
  /**
   * @param {HTMLElement} parent
   * @param {File} file
   * @param {object} itemInRenamingState
   * @param {boolean} isRenamingInProgress
   * @param {object} renamingError
   */
  /**
   * @typedef {object} FileConfig
   * @property {File} file
   * @property {object} itemInRenamingState
   * @property {boolean} isRenamingInProgress
   * @property {object} renamingError
   */
  /**
   * @param {HTMLElement} parent
   * @param {FileConfig} fileConfig
   */
  constructor(parent,
    {
      file,
      itemInRenamingState,
      isRenamingInProgress,
      renamingError,
    }) {
    super(parent);
    this.#file = file;
    this.#itemInRenamingState = itemInRenamingState;
    this.#isRenamingInProgress = isRenamingInProgress;
    this.#renamingError = renamingError;
    this.#type = this.fileTypeIconFactory.getType(this.#file.mimetype);
    this.#icon = this.fileTypeIconFactory.getIcon(this.#file.mimetype);
    this.init();
  }
  /**
   * @inheritDoc
   */
  afterRender() {
    const linkDelete = this.getSlot('link-delete');
    linkDelete.addEventListener(('click'), (e)=>{
      e.preventDefault();
      this.#submitTarget.dispatchEvent(new Event(DELETE_FILE_EVENT));
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
        const clonedFile = this.#file;
        this.#file = {...clonedFile, name: input.value};
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
   * @param {File} file
   */
  set file(file) {
    this.#file = file;
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
   * Set listener to delete the file.
   * @param {function(string) :void} listenerOnDeleteFile
   */
  onDelete(listenerOnDeleteFile) {
    this.#submitTarget.addEventListener(DELETE_FILE_EVENT, ()=>listenerOnDeleteFile(this.#file));
  }

  /**
   * Add event listener for double-click on row.
   * @param {function(object): void} listenerOnEdit
   */
  onEditing(listenerOnEdit) {
    this.#submitTarget.addEventListener(EDIT_EVENT, () => {
      listenerOnEdit(this.#file);
    });
  }
  /**
   * Add event listener for changing value in input.
   * @param {function(object): void} listenerOnRename
   */
  onNameChanged(listenerOnRename) {
    this.#submitTarget.addEventListener(RENAME_EVENT, () => {
      listenerOnRename(this.#file);
    });
  }
  /**
   * Convert size from bytes.
   * @param {number} a
   * @param {number} b
   * @returns {string}
   */
  #formatBytes(a, b=2) {
    if (!+a) {
      return '0 Bytes';
    }
    const c=0>b?0:b; const d=Math.floor(Math.log(a)/Math.log(1024));
    return `${parseInt((a/Math.pow(1024, d))
      .toFixed(c))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]}`;
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
                        <input class="input-text name" value="${this.#file.name}">
                    </td>`;
    } else {
      name = `<td class="cell-name">
                        ${this.#file.name}
                    </td>`;
    }
    if (this.#file) {
      innerText = `
            <tr>
                    <td class="cell-arrow">
                    </td>
                    <td class="cell-icon">
                        <span class="glyphicon ${this.#icon}" 
                        aria-hidden="true">
                        </span>
                    </td>
                    ${name}
                    <td class="cell-type">
                       ${this.#type}
                    </td>
                    <td class="cell-size">
                        ${this.#formatBytes(this.#file.size)}
                    </td>
                    <td class="cell-buttons">
                        <div class="button-hidden">
                            <a href="#" class="blue-button">
                                <span class="glyphicon glyphicon-download" aria-hidden="true"></span>
                            </a>
                            <a href="#" class="red-button" ${this.markElement('link-delete')}>
                                <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                            </a>
                        </div>

                    </td>
                </tr>`;
    }
    return `${innerText}`;
  }
}

