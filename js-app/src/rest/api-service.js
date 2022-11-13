import {RequestService} from './request-service.js';
import {AuthorisationData} from '../authorisation-data.js';
import {ServerValidationError} from './errors/server-validation-error.js';
import {DefaultServerError} from './errors/default-server-error.js';
import {ServerLoginError} from './errors/server-login-error.js';

/**
 * Service that use {@link RequestService} to communicate with server according to the needs of processes.
 */
export class ApiService {
  #requestService;
  #userToken;

  /**
   * @param {RequestService} requestService
   */
  constructor(requestService) {
    this.#requestService = requestService;
  }

  /**
   * Sends information about user authorisation and handle its response.
   * @param {AuthorisationData} authorisationData
   * @returns {Promise<Response>}
   */
  logIn(authorisationData) {
    const data = JSON.stringify({username: authorisationData.loginName, password: authorisationData.password});
    return this.#requestService.postJson('api/login', data)
        .then((response) => {
          if (response.code === 200) {
            this.#userToken = response.body.token;
          }
          if (response.code === 401) {
            throw new ServerLoginError();
          }
          if (response.code !== 200) {
            throw new DefaultServerError();
          }
        });
  }

  /**
   * Sends information about user registration and handle its response.
   * @param {AuthorisationData} authorisationData
   * @returns {Promise<Response>}
   */
  register(authorisationData) {
    const data = JSON.stringify({username: authorisationData.loginName, password: authorisationData.password});
    return this.#requestService.postJson('api/register', data)
        .then((response) => {
          if (response.code === 422) {
            throw new ServerValidationError(response.body.errors);
          }
          if (response.code !== 200) {
            throw new DefaultServerError();
          }
        });
  }

  /**
   * Gets information about user.
   * @returns {Promise}
   */
  getUser() {
    return this.#requestService.getJson('api/getUser', this.#userToken)
        .then((response) => {
          if (response.code !== 200) {
            return Promise.reject(new DefaultServerError());
          }
          if (response.code === 200) {
            return Promise.resolve(response.body.userName);
          }
        });
  }
}
