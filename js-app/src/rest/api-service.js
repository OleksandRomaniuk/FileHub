import {RequestService} from './request-service.js';
import {AuthorisationData} from '../authorisation-data.js';
import {ServerValidationError} from './errors/server-validation-error.js';
import {DefaultServerError} from './errors/default-server-error.js';
import {UnauthorizedServerError} from './errors/unauthorized-server-error.js';
import {ForbiddenServerError} from './errors/forbidden-server-error.js';

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
            return Promise.reject(new UnauthorizedServerError());
          }
          if (response.code !== 200) {
            return Promise.reject(new DefaultServerError());
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
            return Promise.reject(new ServerValidationError(response.body.errors));
          }
          if (response.code !== 200) {
            return Promise.reject(new DefaultServerError());
          }
        });
  }

  /**
   *
   * @param {string} userId
   * @returns {Promise<*>}
   */
  getUser(userId) {
    return this.#requestService.getJson('api/getUser', userId)
        .then((response) => {
          if (response.code === 403) {
            return Promise.reject(new ForbiddenServerError());
          }
          if (response.code !== 200) {
            return Promise.reject(new DefaultServerError());
          }
          if (response.code === 200) {
            return Promise.resolve(response.body.userName);
          }
        });
  }
}
