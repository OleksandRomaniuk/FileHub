import {TitleService} from './services/title-service.js';
import {RequestService} from './rest/request-service.js';
import {ApiService} from './rest/api-service.js';

/**
 * Class that provides application configuration information.
 */
export class ApplicationContext {
  #titleService;
  #apiService;

  /**
   * Creates all dependencies that needed for configuration.
   */
  constructor() {
    this.#titleService = new TitleService('FileHub', '-');

    const requestService = new RequestService();

    this.#apiService = new ApiService(requestService);
  };

  /**
   * @returns {TitleService}
   */
  get titleService() {
    return this.#titleService;
  }

  /**
   * @returns {ApiService}
   */
  get apiService() {
    return this.#apiService;
  }
}
