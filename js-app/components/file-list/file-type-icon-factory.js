/**
 * Factory for icons by file type.
 */
export class FileTypeIconFactory {
  #mimetypes = {
    'application/pdf': {
      type: 'PDF Document',
      icon: 'glyphicon-book',
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      type: 'Excel Workbook',
      icon: 'glyphicon-list-alt',
    },
    'image/jpeg': {
      type: 'JPEG Image',
      icon: 'glyphicon-picture',
    },
    'video/x-msvideo': {
      type: 'AVI Movie',
      icon: 'glyphicon-film',
    },
    'image/avif': {
      type: 'AVI Movie',
      icon: 'glyphicon-film',
    },
    'audio/mpeg': {
      type: 'MP3 Audio',
      icon: 'glyphicon-music',
    },
  };

  /**
   * Get icon by type.
   * @param {string} mimeType
   * @returns {string}
   */
  getIcon(mimeType) {
    return this.#mimetypes[mimeType].icon;
  }
  /**
   * Get the standard type by MIME type.
   * @param {string} mimeType
   * @returns {string}
   */
  getType(mimeType) {
    return this.#mimetypes[mimeType].type;
  }
}
