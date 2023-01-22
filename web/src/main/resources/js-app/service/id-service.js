/**
 * Service to generate unique indexes.
 */
export class IdService {
  static #index = 0;

  /**
   * @returns {string}
   */
  static get id() {
    IdService.#index += 1;
    return 'FileHub - ' + IdService.#index;
  }
}
