
/**
 * Provided as a service for title creating.
 */
export class TitleService {
  #mainTitle;
  #separator;
  #title = [];

  /**
   * @param {string} mainTitle
   * @param {string} separator
   */
  constructor(mainTitle, separator) {
    this.#mainTitle = mainTitle;
    this.#separator = separator;
  }

  /**
   * @param {string[]} value
   */
  set title(value) {
    this.#title = value;
    document.title = this.#createFullTitle();
  }

  /**
   * @returns {string}
   */
  #createFullTitle() {
    let fullTitle = this.#mainTitle;
    this.#title.forEach((title) => {
      fullTitle += ` ${this.#separator} ` + title;
    });
    return fullTitle;
  }
}
