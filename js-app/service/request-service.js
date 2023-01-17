import {Response} from './response';

/**
 * Service to process requests.
 */
export class RequestService {
  /**
   * Method sends data to the server.
   * @param {string} url
   * @param {string} data
   * @returns {Promise<Response>}
   */
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {'Content-Type': 'application/json;charset=utf-8'},
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
  async get(url, token) {
    const fetchResponse = await fetch(url, {
      method: 'GET',
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
}
