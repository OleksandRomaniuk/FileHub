import {Component} from './component.js';

/**
 * Component that represent table when it's loading.
 */
export class TableLoading extends Component {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.init();
  }

  /**
   * @inheritDoc
   */
  markup() {
    return `<div class="file-table-wrapper table-state">
              <div class="table-loading">
                  <span class="glyphicon glyphicon-loader" aria-hidden="true"></span>
              </div>
            </div>`;
  }
}
