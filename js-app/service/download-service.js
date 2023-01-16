import {inject} from '../application/registry';

/**
 * Service to download thi file.
 */
export class DownloadService {
    @inject apiService;

    /**
     * @typedef {object} File
     * @property {string} type
     * @property {string} mimetype
     * @property {string} name
     * @property {string} size
     * @property {string} id
     * @property {string} parentId
     */
    /**
     * Download the file.
     * @param {File} file
     * @returns {Promise}
     */
    download(file) {
      return this.apiService
        .download(file)
        .then((data)=>{
          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(data);
          a.download = file.name;
          a.click();
        });
    }
}
