import {RequestService} from './request-service.js';
import {AuthorisationData} from '../authorisation-data.js';
import {DefaultServerError} from './errors/default-server-error.js';
import {ServerValidationError} from './errors/server-validation-error.js';
import {ServerLoginError} from './errors/server-login-error.js';
import {FileModel} from '../state/file-model.js';

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
   * @returns {Promise<ServerLoginError|DefaultServerError>}
   */
  async logIn(authorisationData) {
    const data = JSON.stringify({username: authorisationData.loginName, password: authorisationData.password});

    let response;

    try {
      response = await this.#requestService.postJson('api/login', data);
    } catch (e) {
      throw new DefaultServerError();
    }

    if (response.code === 200) {
      this.#userToken = response.body.token;
    }
    if (response.code === 401) {
      throw new ServerLoginError();
    }
    if (response.code !== 200) {
      throw new DefaultServerError();
    }
  }

  /**
   * Sends information about user registration and handle its response.
   * @param {AuthorisationData} authorisationData
   * @returns {Promise<ServerValidationError|DefaultServerError>}
   */
  async register(authorisationData) {
    const data = JSON.stringify({username: authorisationData.loginName, password: authorisationData.password});

    let response;

    try {
      response = await this.#requestService.postJson('api/register', data);
    } catch (e) {
      throw new DefaultServerError();
    }

    if (response.code === 422) {
      throw new ServerValidationError(response.body.errors);
    }
    if (response.code !== 200) {
      throw new DefaultServerError();
    }
  }

  /**
   * Gets information about user.
   * @returns {Promise<DefaultServerError|string>}
   */
  async getUser() {
    let response;

    try {
      response = await this.#requestService.getJson('api/getUser', this.#userToken);
    } catch (e) {
      throw new DefaultServerError();
    }

    if (response.code !== 200) {
      throw new DefaultServerError();
    }
    return response.body.userProfile;
  }

  /**
   * Gets information about current folder.
   * @param {string} folderId
   * @returns {Promise}
   */
  getFolder(folderId) {
    return this.#requestService.getJson(`api/getFolder/${folderId}`, this.#userToken)
        .then((response) => {
          if (response.code !== 200) {
            throw new DefaultServerError();
          }
          return response.body.currentFolder;
        });
  }

  /**
   * @typedef FolderContent
   * @property {FileModel[]} items
   */

  /**
   * Gets content of folder.
   * @param {string} folderId
   * @returns {FolderContent}
   */
  getFolderContent(folderId) {
    return this.#requestService.getJson(`api/getFolder/${folderId}/content`, this.#userToken)
        .then((response) => {
          if (response.code !== 200) {
            throw new DefaultServerError();
          }
          return response.body.folderContent;
        });
  }
}
