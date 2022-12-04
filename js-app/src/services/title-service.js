import {Preconditions} from '../preconditions.js';

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
    Preconditions.checkType(mainTitle, 'string');
    Preconditions.checkType(separator, 'string');
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
   * Construct full title that separated by '-'.
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
