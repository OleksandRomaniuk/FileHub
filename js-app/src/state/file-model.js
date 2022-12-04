/**
 * Model that represents meta data about folder.
 */
export class FileModel {
  /**
   * @type {string}
   */
  name;

  /**
   * @type {string}
   */
  id;

  /**
   * @type {number}
   */
  itemsAmount;

  /**
   * @type {string}
   */
  type;

  /**
   * @type {string}
   */
  size;

  /**
   * @type {string}
   */
  parentId;

  /**
   * @param {FileModel|object} fileModel
   */
  constructor(fileModel = {}) {
    this.#setOwnProperties(fileModel);
  }

  /**
   * @param {FileModel|object} source
   * @private
   */
  #setOwnProperties(source) {
    const properties = Object.keys(this);
    const entries = Object.entries(source)
        .filter(([key]) => properties.includes(key));
    entries.forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
