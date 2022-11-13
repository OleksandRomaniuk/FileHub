import {TitleService} from './services/title-service.js';
import {RequestService} from './rest/request-service.js';
import {ApiService} from './rest/api-service.js';
import {StateManagementService} from './services/state-management-service.js';
import {mutators} from './mutators/mutators.js';

export class ApplicationContext {
  #titleService;
  #apiService;
  #stateManagementService;

  /**
   *
   */
  constructor() {
    this.#titleService = new TitleService('FileHub', '-');

    const requestService = new RequestService();

    this.#apiService = new ApiService(requestService);

    const initialState = {
      isLoading: false,
      name: null,
      error: null,
    };

    this.#stateManagementService = new StateManagementService(mutators, initialState);
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
