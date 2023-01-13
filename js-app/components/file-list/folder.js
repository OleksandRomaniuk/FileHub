import {Link} from '../link';
import {Component} from '../component';
import {inject} from '../../application/registry';

const DELETE_FOLDER_EVENT = 'delete_folder_event';
const NAVIGATE_FOLDER_EVENT = 'navigate_folder_event';
/**
 * The component for generate information about folder.
 */
export class Folder extends Component {
  #folder;
  #submitTarget = new EventTarget();
  @inject fileTypeIconFactory;
  /**
   * @param {HTMLElement} parent
   * @param {object} folder
   */
  constructor(parent, folder) {
    super(parent);
    this.#folder = folder;

    this.init();
  }
  /**
   * @inheritDoc
   */
  afterRender() {
    const slot = this.getSlot('link-slot-folder');
    const link = new Link(slot, this.#folder.name);
    link.onClick(()=> {
      this.#submitTarget.dispatchEvent(new Event(NAVIGATE_FOLDER_EVENT));
    });
    const linkDelete = this.getSlot('link-delete');
    linkDelete.addEventListener(('click'), (e)=>{
      e.preventDefault();
      this.#submitTarget.dispatchEvent(new Event(DELETE_FOLDER_EVENT));
    });
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
   * Add listener to redirect to the another folder.
   * @param {function(object) :void} listenerNavigateToFolder
   */
  onNavigateToFolder(listenerNavigateToFolder) {
    this.#submitTarget.addEventListener(NAVIGATE_FOLDER_EVENT, () => {
      listenerNavigateToFolder(this.#folder.id);
    });
  }

  /**
   * @inheritDoc
   */
  markup() {
    let innerText;
    if (this.#folder) {
      innerText = `
            <tr>
                    <td class="cell-arrow">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    </td>
                    <td class="cell-icon">
                       <span class="glyphicon ${this.fileTypeIconFactory
        .getIcon(this.#folder.type)}" aria-hidden="true">
                       </span>
                    </td>
                    <td class="cell-name folder">
                    ${this.addSlot('link-slot-folder')}
                    </td>
                    <td class="cell-type">
                        Folder
                    </td>
                    <td class="cell-size">
                        —
                    </td>
                    <td class="cell-buttons">
                        <div class="button-hidden">
                            <a href="#" class="green-button" >
                                <span class="glyphicon glyphicon-upload" aria-hidden="true" ></span>
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

