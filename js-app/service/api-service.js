import {RequestService} from './request-service';
import {RegisterError} from './errors/register-error.js';
import {UserData} from '../application/user-data.js';
import {LoginFailedError} from './errors/login-failed-error.js';
import {GeneralServerError} from './errors/general-server-error.js';

/**
 * Service provides methods for working with user data.
 */
export class ApiService {
  #requestService;
  #userToken;

  /**
   * @param {RequestService}requestService
   */
  constructor(requestService) {
    this.#requestService = requestService;
  }


  /**
   * Works with {@link RequestService} and status checks. Gives a token or an error depending on the status.
   * @param {UserData} userData
   * @returns {Promise.<undefined | (LoginFailedError | GeneralServerError)>}
   */
  logIn(userData) {
    return this.#requestService.post('api/login',
        JSON.stringify({username: userData.email, password: userData.password}))
        .catch(()=>{
          throw new GeneralServerError();
        })
        .then((response)=>{
          if (response.status === 200) {
            this.#userToken = response.body.token;
          }
          if (response.status === 401) {
            throw new LoginFailedError();
          }
          if (response.status !== 200 && response.status !== 401) {
            throw new GeneralServerError();
          }
        });
  }
  /**
   * Works with {@link RequestService} for register new users.
   * @param {UserData} userData
   * @returns {Promise.<undefined | (RegisterError | GeneralServerError)>}
   */
  register(userData) {
    return this.#requestService.post('api/register',
        JSON.stringify({username: userData.email, password: userData.password}))
        .catch(()=>{
          throw new GeneralServerError();
        })
        .then((response) => {
          if (response.status === 422) {
            throw new RegisterError(response.body.errors);
          }
          if (response.status !== 200) {
            throw new GeneralServerError();
          }
        });
  }
  /**
   * Get data about user.
   * @returns {Promise | Error}
   */
  getUser() {
    return this.#requestService.get('api/user', this.#userToken)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Error occurred. Please try again.');
          }
          return response.body;
        });
  }
  /**
   * Get data about folder.
   * @param {string} id
   * @returns {Promise | Error}
   */
  getFolder(id) {
    return this.#requestService.get('api/folders/'+id, this.#userToken)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Error occurred. Please try again.');
          }
          return response.body;
        });
  }
  /**
   * Get data about files and folder in current folder.
   * @param {string} id
   * @returns {Promise | Error}
   */
  getFolderContent(id) {
    return this.#requestService.get('api/folders/'+id+'/content', this.#userToken)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Error occurred. Please try again.');
          }
          return response.body;
        });
  }

  /**
   * Delete the folder or file.
   * @param {object} item
   * @returns {*}
   */
  deleteItem(item) {
    const type = item.type === 'folder' ? 'folder' : 'file';
    return this.#requestService.delete(`api/${type}/`+ item.id, this.#userToken)
        .catch(()=>{
          throw new GeneralServerError();
        })
        .then((response)=>{
          if (response.status !== 200) {
            throw new Error('Error occurred. Please try again.');
          }
        });
  }
}
