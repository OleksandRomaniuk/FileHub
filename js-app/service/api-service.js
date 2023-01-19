import {RequestService} from './request-service';
import {RegisterError} from './errors/register-error';
import {UserData} from '../application/user-data';
import {LoginFailedError} from './errors/login-failed-error';
import {GeneralServerError} from './errors/general-server-error';
import {RenameItemValidationError} from './errors/rename-item-validation-error';
import {CreatingFolderError} from './errors/creating-folder-error';
import {inject} from '../application/registry';

/**
 * Service provides methods for working with user data.
 */
export class ApiService {
  #requestService;
  @inject storage
  #logoutListener;

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
          this.storage.saveToken(response.body.token);
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
    return this.#requestService.getJson('api/user', this.storage.getToken())
      .then((response) => {
        if (response.status === 401) {
          this.storage.deleteToken();
          this.#logoutListener();
        } else if (response.status !== 200) {
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
    return this.#requestService.getJson('api/folders/'+id, this.storage.getToken())
      .then((response) => {
        if (response.status === 401) {
          this.storage.deleteToken();
          this.#logoutListener();
        } else if (response.status !== 200) {
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
    return this.#requestService.getJson('api/folders/'+id+'/content', this.storage.getToken())
      .then((response) => {
        if (response.status === 401) {
          this.storage.deleteToken();
          this.#logoutListener();
        } else if (response.status !== 200) {
          throw new Error('Error occurred. Please try again.');
        }
        return response.body;
      });
  }
  /**
   * Get data about items in current folder with similar name.
   * @param {string} id
   * @param {string} name
   * @returns {Promise | Error}
   */
  getFolderContentByName(id, name) {
    return this.#requestService.getJson(`api/folders/${id}/content/${name}`, this.storage.getToken())
      .then((response) => {
        if (response.status === 401) {
          this.storage.deleteToken();
          this.#logoutListener();
        } else if (response.status !== 200) {
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
    return this.#requestService.delete(`api/${item.type}/`+ item.id, this.storage.getToken())
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response)=>{
        if (response.status === 401) {
          this.storage.deleteToken();
          this.#logoutListener();
        } else if (response.status !== 200) {
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
      this.storage.getToken())
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response)=>{
        if (response.status === 401) {
          this.storage.deleteToken();
          this.#logoutListener();
        } else if (response.status !== 200) {
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
    return this.#requestService.put(`api/${item.type}/` + item.id, JSON.stringify(item),
      this.storage.getToken())
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response)=>{
        if (response.status === 401) {
          this.storage.deleteToken();
          this.#logoutListener();
          return;
        }
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
      this.storage.getToken())
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response)=>{
        if (response.status === 401) {
          this.storage.deleteToken();
          this.#logoutListener();
        } else if (response.status === 500) {
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
    return this.#requestService.getBlob('api/files/'+file.id, this.storage.getToken())
      .catch(()=>{
        throw new GeneralServerError();
      })
      .then((response) => {
        if (response.status === 401) {
          this.storage.deleteToken();
          this.#logoutListener();
          return;
        } else if (response.status !== 200) {
          throw new Error('Error occurred. Please try again.');
        }
        return response.body;
      });
  }

  /**
   * Logout user and delete the token.
   * @returns {Promise}
   */
  logout() {
    return this.#requestService.post('api/logout', null, this.storage.getToken())
      .catch(()=>{})
      .then(()=>{
        this.storage.deleteToken();
        this.#logoutListener();
      });
  }

  /**
   * Set listener to redirect on log in page.
   * @param {function(): void} listener
   */
  onLogOut(listener) {
    this.#logoutListener = listener;
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
