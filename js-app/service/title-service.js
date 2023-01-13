/**
 * Service for configuration title for page.
 */
export class TitleService {
  #separator;
  #mainTitle;
  #title = [];

  /**
   * @param {string} firstTitle
   * @param {string} separator
   */
  constructor(firstTitle, separator ) {
    this.#mainTitle = firstTitle;
    this.#separator = separator;
  }
  /**
   * Setting array of titles.
   * @param {string[]} titles
   */
  setTitle(titles) {
    this.#title = titles;
    document.title = this.getTitle();
  }

  /**
   * Return connected titles with '-'.
   * @returns {string}
   */
  getTitle() {
    return this.#mainTitle + this.#separator + this.#title.join(this.#separator);
  }
}

