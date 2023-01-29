/**
 * The component for generate button.
 */
import {Component} from '../components/component.js';

/**
 * Component for generate error 404 page.
 */
export class ErrorComponent extends Component {
  /**
   * @param {HTMLElement} parent
   */
  constructor(parent ) {
    super(parent);
    this.init();
  }
  /**
   * @inheritDoc
   */
  markup() {
    return `
    <div id="notfound">
    <div class="notfound">
        <div class="notfound-bg">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <h1>oops!</h1>
        <h2>Error 404 : Page Not Found</h2>
        <a href="#">go back</a>
    </div>
</div>

    `;
  }
}


