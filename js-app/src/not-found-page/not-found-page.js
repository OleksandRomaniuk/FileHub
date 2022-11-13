import {Component} from '../components/component.js';
import {Link} from '../components/link.js';
import {TitleService} from '../services/title-service.js';

/**
 * 404 error page component.
 */
export class NotFoundPage extends Component {
  #navigateListener;

  /**
   * @param {HTMLElement} parent
   * @param {TitleService} titleService
   */
  constructor(parent, titleService) {
    super(parent);
    this.init();
    titleService.title = ['404'];
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    const linkSlot = this.getSlot('link');
    const link = new Link(linkSlot, 'YES');

    link.onClick(() => {
      this?.#navigateListener();
    });
  }

  /**
   * Adds listener for 'navigate' event.
   * @param {Function} listener
   */
  onNavigateToHome(listener) {
    this.#navigateListener = listener;
  }

  /**
   * @inheritDoc
   * @returns {string}
   */
  markup() {
    return `
        <section class="notFound" data-td="page-not-found">
        <div class="img">
        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
        <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
        </div>
        <div class="text">
        <h1>404</h1>
        <h2 class="page-not">PAGE NOT FOUND</h2>
        <h3>BACK TO HOME?</h3>
        <p>
            ${this.addSlot('link')}
        </p>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">NO</a>
        </div>
        </section>
        `;
  }
}
