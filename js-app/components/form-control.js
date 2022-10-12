import {Component} from './component.js';

/**
 * The component for form row with label and input.
 */
export class FormControl extends Component {
  _errorMessages = [];
  _labelText;
  _type = 'text';
  _name;
  _placeholder;
  _id = crypto.randomUUID();
  _value ='';
  /**
   * @param {string} error
   */
  set errorMessages(error) {
    this._errorMessages.push(error);
    this.render();
  }
  /**
   * Clear array of errors by initialization.
   */
  deleteErrorsMessages() {
    this._errorMessages = [];
    this.render();
  }
  /**
   * @param {string} text
   */
  set labelText(text) {
    this._labelText = text;
    this.render();
  }
  /**
   * @param {string} value
   */
  set value(value) {
    this._value = value;
    this.render();
  }
  /**
   * @param {string} type
   */
  set type(type) {
    this._type = type;
    this.render();
  }

  /**
   * @param {string} name
   */
  set name(name) {
    this._name = name;
    this.render();
  }

  /**
   * @returns {string}
   */
  get name() {
    return this._name;
  }
  /**
   * @param {string} text
   */
  set placeholder(text) {
    this._placeholder = text;
    this.render();
  }

  /**
   * @returns {string} form control row with label and input html as string
   */
  markup() {
    const errorMessages = this._errorMessages?.map((error) => `
    <p class="error-text">${error}</p>
    `).join(' ');
    return ` 
    <div class="form-control">
        <label for="${this._id}">${this._labelText} </label>
        <div>
            <input class="input-text ${errorMessages? 'input-error' : ''}"  type="${this._type}" id="${this._id}" 
            name="${this._name}" placeholder="${this._placeholder}" value="${this._value}">
            ${errorMessages ?? ''}
        </div>
    </div>
    `;
  }
}
