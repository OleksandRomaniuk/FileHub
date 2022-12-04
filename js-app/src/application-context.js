import {TitleService} from './services/title-service.js';
import {RequestService} from './rest/request-service.js';
import {ApiService} from './rest/api-service.js';
import {State} from './state/state.js';
import {StateManagementService} from './services/state-management-service.js';
import {mutators} from './mutators/mutators.js';

/**
 * Class that provides application configuration information.
 */
export class ApplicationContext {
  #titleService;
  #apiService;
  #stateManagementService;

  /**
   * Creates all dependencies that needed for configuration.
   */
  constructor() {
    this.#titleService = new TitleService('FileHub', '-');

    const requestService = new RequestService();

    this.#apiService = new ApiService(requestService);

    const initialState = new State();

    this.#stateManagementService =
        new StateManagementService(mutators, initialState);
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

  /**
   * @returns {StateManagementService}
   */
  get stateManagementService() {
    return this.#stateManagementService;
  }
}
