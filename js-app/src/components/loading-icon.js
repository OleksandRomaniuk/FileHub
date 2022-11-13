import {Component} from './component.js';

/**
 * User menu in loading state.
 */
export class LoadingIcon extends Component {
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
    return `<span class="glyphicon glyphicon-loader" aria-hidden="true"></span>`;
  }
}
