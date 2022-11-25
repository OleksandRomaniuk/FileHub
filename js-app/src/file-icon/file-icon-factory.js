/**
 * Factory for getting HTML icon class depending on mime type.
 */
export class FileIconFactory {
  #icons = {
    'Folder': 'glyphicon-folder-close',
    'mp3': 'glyphicon-music',
    'pdf': 'glyphicon-book',
    'xlsx': 'glyphicon-list-alt',
    'jpeg': 'glyphicon-picture',
    'AVI': 'glyphicon-film',
  };

  /**
   * Returns icon class name.
   * @param {string} iconName
   * @returns {string}
   */
  getIconClassName(iconName) {
    return this.#icons[iconName];
  };
}
