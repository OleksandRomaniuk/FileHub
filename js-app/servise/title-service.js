/**
 * Service for configuration title for page.
 */
export class TitleService {
  #mainTitle;
  #title = {};

  /**
   * @param {string} firstTitle
   */
  constructor(firstTitle) {
    this.#mainTitle = firstTitle;
  }
  /**
   * @param {string[]} titles
   */
  setTitle(titles) {
    this.#title = titles;
    document.title = this.getTitle();
  }

  /**
   * @returns {string}
   */
  getTitle() {
    return this.#mainTitle + ' - ' + this.#title;
  }
}

