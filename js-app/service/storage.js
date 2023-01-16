export class Storage {

  saveToken(value) {
    localStorage.setItem('token', value);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
