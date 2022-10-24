import {Component} from './component.js';

/**
 * The component for form row with label and input.
 */
export class FormControl extends Component {
  #errorMessages = [];
  #labelText;
  #type = 'text';
  #name;
  #placeholder;
  #id = crypto.randomUUID();
  #value ='';


  /**
   * @typedef {Object} FormControlConfig
   * @property {string} labelText
   * @property {string} type
   * @property {string} name
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
    type='text',
    name,
    placeholder='',
    errorMessages=[],
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
   * @param {string} error
   */
  set errorMessages(error) {
    if (error) {
      this.#errorMessages.push(error);
      this.render();
    }
  }
  /**
   * Clear array of errors by initialization.
   */
  deleteErrorsMessages() {
    this.#errorMessages = [];
    this.render();
  }
  /**
   * @param {string} value
   */
  set value(value) {
    this.#value = value;
    this.render();
  }
  /**
   * @param {string} type
   */
  set type(type) {
    this.#type = type;
    this.render();
  }
  /**
   * @returns {string}
   */
  get name() {
    return this.#name;
  }
  /**
   * @param {string} text
   */
  set placeholder(text) {
    this.#placeholder = text;
    this.render();
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
        <label for="${this.#id}">${this.#labelText} </label>
        <div>
            <input class="input-text ${errorMessages? 'input-error' : ''}"  type="${this.#type}" id="${this.#id}" 
            name="${this.#name}" placeholder="${this.#placeholder}" value="${this.#value}">
            ${errorMessages ?? ''}
        </div>
    </div>
    `;
  }
}
