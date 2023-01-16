import {RequestService} from './request-service';
import {RegisterError} from './errors/register-error.js';
import {UserData} from '../application/user-data.js';
import {LoginFailedError} from './errors/login-failed-error.js';
import {GeneralServerError} from './errors/general-server-error.js';
import {RenameItemValidationError} from './errors/rename-item-validation-error.js';
import {CreatingFolderError} from './errors/creating-folder-error.js';

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
      JSON.stringify({username: userData.email, password: userData.password}),
      this.#userToken)
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
      JSON.stringify({username: userData.email, password: userData.password}),
      this.#userToken)
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
    return this.#requestService.getJson('api/user', this.#userToken)
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
    return this.#requestService.getJson('api/folders/'+id, this.#userToken)
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
    return this.#requestService.getJson('api/folders/'+id+'/content', this.#userToken)
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
    return this.#requestService.delete(`api/${item.type}/`+ item.id, this.#userToken)
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response)=>{
        if (response.status !== 200) {
          throw new Error('Error occurred. Please try again.');
        }
      });
  }
  /**
   * Upload the files in folder.
   * @param {string} folderId
   * @param {File[]} files
   * @returns {Promise}
   */
  uploadFiles(folderId, files) {
    return this.#requestService.postFormData(
      'api/folder/'+ folderId+'/content',
      this.#createFormData(files),
      this.#userToken)
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response)=>{
        if (response.status !== 200) {
          throw new Error('Error occurred. Please try again.');
        }
      });
  }

  /**
   * Rename the file or the  folder.
   * @param {object} item
   * @returns {Promise}
   */
  rename(item) {
    return this.#requestService.put(`api/${item.type}/` + item.id, JSON.stringify(item), this.#userToken)
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response)=>{
        if (response.status === 422) {
          throw new RenameItemValidationError(response.body.errors);
        }
        if (response.status !== 200) {
          throw new Error('Error occurred. Please try again.');
        }
      });
  }
  /**
   * Create the  new folder.
   * @param {object} folder
   * @returns {Promise}
   */
  createFolder(folder) {
    return this.#requestService.post('api/folders',
      JSON.stringify({
        name: folder.name,
        itemsAmount: 0,
        type: 'folder',
        parentId: folder.parentId,
      }),
      this.#userToken)
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response)=>{
        if (response.status === 500) {
          throw new CreatingFolderError(response.body.error);
        } else if (response.status !== 200) {
          throw new Error('Error occurred. Please try again.');
        }
      });
  }

  /**
   * Download the file.
   * @param {object} file
   * @returns {Promise | Error}
   */
  download(file) {
    return this.#requestService.getBlob('api/files/'+file.id, this.#userToken)
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Error occurred. Please try again.');
        }
        return response.body;
      });
  }


  /**
   * @param {File[]} files
   * @returns {FormData}
   * @private
   */
  #createFormData(files) {
    const formData = new FormData();
    [...files].forEach((file, index)=>{
      formData.append(`files_${index}`, file);
    });
    return formData;
  }
}
