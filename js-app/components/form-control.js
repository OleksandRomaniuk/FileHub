import {IdService} from './../service/id-service';

import {Component} from './component';

/**
 * The component to form row with label and input.
 */
export class FormControl extends Component {
  #errorMessages;
  #labelText;
  #type = 'text';
  #name;
  #placeholder;
  #id = IdService.id;
  #value = '';


  /**
   * @typedef {object} FormControlConfig
   * @property {string} labelText
   * @property {string} type
   * @property {string} name
   * @property {string} [value]
   * @property {string} [placeholder ]
   * @property {string[]} [errorMessages ]
   */
  /**
   * @param {HTMLElement} parent
   * @param {FormControlConfig} config
   */
  constructor(parent, {
    labelText,
    type = 'text',
    name,
    placeholder = '',
    errorMessages,
    value = '',
  }) {
    super(parent);
    this.#labelText = labelText;
    this.#type = type;
    this.#name = name;
    this.#placeholder = placeholder;
    this.#errorMessages = errorMessages;
    this.#value = value;
    this.init();
  }

  /**
   * Clear array of errors by initialization.
   */
  deleteErrorsMessages() {
    this.#errorMessages = [];
    this.render();
  }
  /**
   * @returns {string}
   */
  get name() {
    return this.#name;
  }
  /**
   * @inheritDoc
   */
  markup() {
    const errorMessages = this.#errorMessages?.map((error) => `
    <p class="error-text">${error}</p>
    `).join(' ');
    return ` 
    <div class="form-control" ${this.markElement('form-control')}>
        <label for="${this.#id}">${this.#labelText}</label>
        <div>
            <input class="input-text ${errorMessages ? 'input-error' : ''}"  type="${this.#type}" id="${this.#id}" 
            name="${this.#name}" placeholder="${this.#placeholder}" value="${this.#value}">
            ${errorMessages ?? ''}
        </div>
    </div>
    `;
  }
}

