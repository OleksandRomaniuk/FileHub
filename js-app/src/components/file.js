import {Component} from './component.js';
import {FileIconFactory} from '../file-icon/file-icon-factory.js';

/**
 * File row component.
 */
export class File extends Component {
  #name;
  #mimeType;
  #type;
  #size;

  /**
   * @typedef FileEntity
   * @property {string} name
   * @property {string} size
   * @property {string} type
   */

  /**
   * @param {HTMLElement} parent
   * @param {FileEntity} params
   */
  constructor(parent, params) {
    super(parent);
    this.#name = params.name;
    this.#size = params.size;
    this.#type = params.type;
    this.#mimeType = new FileIconFactory().getIconClassName(params.type);
    this.init();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `<tr>
             <td class="open-icon"></td>
             <td class="mime-type-icon"><span class="glyphicon ${this.#mimeType}" aria-hidden="true"></span></td>
             <td class="entity-name">
                <p class="name">${this.#name}</p>
             </td>
             <td class="mime-type">${this.#type}</td>
             <td class="file-size">${this.#size}</td>
             <td class="table-buttons">
                 <a href="#"><span class="glyphicon glyphicon-download" aria-hidden="true"></span></a>
                 <a href="#"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></a>
             </td>
             </tr>`;
  }
}
