import {Component} from './component.js';
import {Link} from './link.js';

const FOLDER_NAVIGATE_EVENT = 'folder-navigate-event';

/**
 * Folder row component.
 */
export class Folder extends Component {
  #name;
  #eventTarget = new EventTarget();
  #id;

  /**
   * @param {HTMLElement} parent
   * @param {string} name
   * @param {string} id
   */
  constructor(parent, name, id) {
    super(parent);
    this.#name = name;
    this.#id = id;
    this.init();
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const folderLinkSlot = this.getSlot('folder-link');
    const link = new Link(folderLinkSlot, this.#name);
    link.onClick(() => {
      this.#eventTarget.dispatchEvent(new CustomEvent(FOLDER_NAVIGATE_EVENT, {detail: this.#id}));
    });
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
    return `<tr>
              <td class="open-icon"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></td>
              <td class="mime-type-icon"><span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span></td>
              <td class="entity-name">
                ${this.addSlot('folder-link')}
              </td>
              <td class="mime-type">Folder</td>
              <td class="file-size">—</td>
              <td class="table-buttons">
                <a href="#"><span class="glyphicon glyphicon-upload upload-link" aria-hidden="true"></span></a>
                <a href="#"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></a>
              </td>
              </tr>`;
  }
}
