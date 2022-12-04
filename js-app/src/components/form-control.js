import {Component} from './component.js';
import {IdService} from '../id-service.js';

/**
 * Form control component.
 */
export class FormControl extends Component {
  #label;
  #type;
  #id = IdService.getId();
  #name;
  #placeholder;
  #value = '';
  #errorMessages = [];

  /**
   * @typedef {object} FormControlConfig
   * @property {string} label
   * @property {string} [type = text]
   * @property {string} name
   * @property {string} [placeholder]
   * @property {string} [value]
   * @property {string[]} [errorMessages]
   */

  /**
   * @param {HTMLElement} parent
   * @param {FormControlConfig} config
   */
  constructor(parent,
      {
        label,
        type,
        name,
        placeholder,
        value,
        errorMessages,
      }) {
    super(parent);
    this.#label = label;
    this.#type = type;
    this.#name = name;
    this.#placeholder = placeholder;
    this.#value = value;
    this.#errorMessages = errorMessages;
    this.init();
  }

  /**
   * @param {string[]} errors
   */
  set errorMessages(errors) {
    this.#errorMessages = errors;
    this.render();
  }

  /**
   * @inheritDoc
   */
  markup() {
    const errorMessages = this.#errorMessages
        ?.map((error) => `<p class='error-label' data-td="error-messages">${error}</p>`)
        .join(' ');
    return `
            <div class="form-section" data-td="form-control">
                <label for="${this.#id}" data-td="label">
                ${this.#label}
                </label>
                <div class="form-input-container ">
                    <input class="form-input ${errorMessages ? 'input-error' : ''}" data-td="input"
                    id="${this.#id}" type="${this.#type}" name="${this.#name}" 
                        placeholder="${this.#placeholder}" value="${this.#value}">
                    ${errorMessages ?? ''}
                </div>
            </div>
    `;
  }
}
