import {Component} from '../component';
import {inject} from '../../application/registry';

const DELETE_FILE_EVENT = 'delete_file_event';
/**
 * The component for generate information about file.
 */
export class File extends Component {
  #file;
  #submitTarget = new EventTarget();
  @inject fileTypeIconFactory;
  /**
   * @param {HTMLElement} parent
   * @param {object} file
   */
  constructor(parent, file) {
    super(parent);
    this.#file = file;
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
  }
  /**
   * Set listener to delete the file.
   * @param {function(string) :void} listenerOnDeleteFile
   */
  onDelete(listenerOnDeleteFile) {
    this.#submitTarget.addEventListener(DELETE_FILE_EVENT, ()=>listenerOnDeleteFile(this.#file));
  }

  /**
   * @inheritDoc
   */
  markup() {
    let innerText;
    if (this.#file) {
      innerText = `
            <tr>
                    <td class="cell-arrow">

                    </td>
                    <td class="cell-icon">
                        <span class="glyphicon ${this.fileTypeIconFactory.getIcon(this.#file.type)}" aria-hidden="true">
                        </span>
                    </td>
                    <td class="cell-name">
                        ${this.#file.name}
                    </td>
                    <td class="cell-type">
                        ${this.#file.type}
                    </td>
                    <td class="cell-size">
                        ${this.#file.size}
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

