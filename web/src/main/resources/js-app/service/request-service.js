import {Response} from './response';

/**
 * Service to process requests.
 */
export class RequestService {
  /**
   * Method sends data to the server.
   * @param {string} url
   * @param {string} data
   * @param {string} token
   * @returns {Promise<Response>}
   */
  async post(url, data, token) {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json;charset=utf-8'},
    });

    try {
      return new Response(response.status, await response.json());
    } catch (e) {
      return new Response(response.status);
    }
  }
  /**
   * Method sends FormData to the server.
   * @param {string} url
   * @param {FormData} data
   * @param {string} token
   * @returns {Promise<Response>}
   */
  async postFormData(url, data, token) {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': 'Bearer ' + token},
    });

    try {
      return new Response(response.status, await response.json());
    } catch (e) {
      return new Response(response.status);
    }
  }
  /**
   * Method get data from the server.
   * @param {string} url
   * @param {string} token
   * @returns {Promise<Response>}
   */
  async getJson(url, token) {
    const fetchResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    try {
      return new Response(fetchResponse.status, await fetchResponse.json());
    } catch (e) {
      return new Response(fetchResponse.status);
    }
  }
  /**
   * Method get data from the server.
   * @param {string} url
   * @param {string} token
   * @returns {Promise<Response>}
   */
  async getBlob(url, token) {
    const fetchResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
    let responseBody;
    await fetchResponse.blob()
      .then((data) => {
        responseBody = data;
      });
    return new Response(fetchResponse.status, responseBody);
  }
  /**
   * Method delete data from the database.
   * @param {string} url
   * @param {string} token
   * @returns {Promise<Response>}
   */
  async delete(url, token) {
    const fetchResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return new Response(fetchResponse.status);
  }

  /**
   * Update an existing resource on the server.
   * @param {string} url
   * @param {object} data
   * @param {string} token
   * @returns {Promise<Response>}
   */
  async put(url, data, token) {
    const fetchResponse = await fetch(url, {
      method: 'PUT',
      body: data,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    let responseBody;
    await fetchResponse.json()
      .then((json) => {
        responseBody = json;
      });
    return new Response(fetchResponse.status, responseBody);
  }
}
