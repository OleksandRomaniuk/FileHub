import {Component} from './component.js';

/**
 * Component that represent table with error.
 */
export class TableError extends Component {
  #errorMessage;

  /**
   * @param {HTMLElement} parent
   * @param {string} errorMessage
   */
  constructor(parent, errorMessage) {
    super(parent);
    this.#errorMessage = errorMessage;
    this.init();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `<div class="file-table-wrapper table-state">
                <div class="error-label table-error-label">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span>${this.#errorMessage}</span>
                </div>
            </div>`;
  }
}
