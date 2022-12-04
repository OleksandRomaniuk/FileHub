import {Response} from './response.js';

/**
 * Service for sending requests to the server.
 */
export class RequestService {
  /**
   * Sends post request to the server. Can work only with JSON data type.
   * @param {string} url
   * @param {string} data
   * @returns {Promise<Response>}
   */
  async postJson(url, data) {
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
   * Sends get request to the server. Can work only with JSON data type.
   * @param {string} url
   * @param {string} token
   * @returns {Promise<Response>}
   */
  async getJson(url, token) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return new Response(response.status, data);
  }
}
